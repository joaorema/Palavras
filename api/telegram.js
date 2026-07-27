/* global process */

const TELEGRAM_API = "https://api.telegram.org";

function env(name) {
  return process.env[name]?.trim();
}

function json(res, status, body) {
  res.status(status).json(body);
}

function getMessage(update) {
  return update.message || update.edited_message || null;
}

function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

async function sendTelegramMessage(chatId, text) {
  const botToken = env("TELEGRAM_BOT_TOKEN");

  if (!botToken) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN");
  }

  const response = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram send failed: ${response.status} ${body}`);
  }
}

async function createGitHubIssue({ from, text }) {
  const token = env("GITHUB_TOKEN");
  const repo = env("GITHUB_REPO") || "joaorema/Palavras";

  if (!token) {
    return null;
  }

  const title = text.length > 72 ? `${text.slice(0, 69)}...` : text;
  const body = [
    "Change request received from Telegram.",
    "",
    `From: ${from.first_name || "Unknown"} ${from.last_name || ""}`.trim(),
    `Telegram user ID: ${from.id}`,
    "",
    "Request:",
    "",
    text,
  ].join("\n");

  const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "x-github-api-version": "2022-11-28",
      "user-agent": "palavras-telegram-bot",
    },
    body: JSON.stringify({
      title: `Telegram: ${title}`,
      body,
      labels: ["telegram-request"],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub issue failed: ${response.status} ${body}`);
  }

  return response.json();
}

function getHelpText() {
  return [
    "*Palavras request bot*",
    "",
    "Send any change request and I will create a GitHub issue for it\\.",
    "",
    "Commands:",
    "/start \\- show this help",
    "/id \\- show your Telegram user ID",
    "/status \\- check that the bot is online",
  ].join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { ok: false, error: "Method not allowed" });
  }

  const expectedSecret = env("TELEGRAM_WEBHOOK_SECRET");
  const receivedSecret = req.headers["x-telegram-bot-api-secret-token"];

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return json(res, 401, { ok: false, error: "Unauthorized" });
  }

  const message = getMessage(req.body ?? {});

  if (!message?.chat?.id || !message?.from?.id) {
    return json(res, 200, { ok: true, ignored: true });
  }

  const allowedUserId = env("TELEGRAM_ALLOWED_USER_ID");

  if (!allowedUserId || String(message.from.id) !== allowedUserId) {
    await sendTelegramMessage(message.chat.id, "Sorry, this bot is private\\.");
    return json(res, 200, { ok: true, unauthorized: true });
  }

  const text = typeof message.text === "string" ? message.text.trim() : "";

  if (!text) {
    await sendTelegramMessage(message.chat.id, "Send me a text request and I will turn it into a task\\.");
    return json(res, 200, { ok: true });
  }

  if (text === "/start" || text === "/help") {
    await sendTelegramMessage(message.chat.id, getHelpText());
    return json(res, 200, { ok: true });
  }

  if (text === "/id") {
    await sendTelegramMessage(message.chat.id, `Your Telegram user ID is ${message.from.id}`);
    return json(res, 200, { ok: true });
  }

  if (text === "/status") {
    await sendTelegramMessage(message.chat.id, "Online\\. Ready to create change requests\\.");
    return json(res, 200, { ok: true });
  }

  try {
    const issue = await createGitHubIssue({ from: message.from, text });

    if (!issue) {
      await sendTelegramMessage(
        message.chat.id,
        "I received the request, but `GITHUB_TOKEN` is not configured yet, so I could not create an issue\\.",
      );
      return json(res, 200, { ok: true, githubConfigured: false });
    }

    await sendTelegramMessage(
      message.chat.id,
      `Created GitHub issue \\#${issue.number}: ${escapeMarkdown(issue.html_url)}`,
    );
    return json(res, 200, { ok: true, issue: issue.number });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    await sendTelegramMessage(message.chat.id, "Something failed while creating the request\\. Check Vercel logs\\.");
    return json(res, 200, { ok: true, error: true });
  }
}
