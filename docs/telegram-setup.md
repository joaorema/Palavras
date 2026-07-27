# Telegram Request Bot Setup

This bot receives private Telegram messages from one allowed user and turns them into GitHub issues.

## 1. Create The Telegram Bot

1. Open Telegram and message `@BotFather`.
2. Run `/newbot`.
3. Pick a name and username.
4. Copy the bot token. Keep it private.

## 2. Find Your Telegram User ID

Temporary option:

1. Set `TELEGRAM_ALLOWED_USER_ID` to your best guess or leave setup until after deploy.
2. Message the bot with `/id`.
3. If not configured yet, use a bot like `@userinfobot` once to read your ID.

Use only your numeric Telegram user ID.

## 3. Create A GitHub Token

Create a fine-grained GitHub token with access to `joaorema/Palavras`.

Required permission:

- Issues: Read and write

Do not give broader permissions unless needed later.

## 4. Add Vercel Environment Variables

Add these to the `palavras` Vercel project in Production:

```text
TELEGRAM_BOT_TOKEN=your_botfather_token
TELEGRAM_WEBHOOK_SECRET=random_long_secret
TELEGRAM_ALLOWED_USER_ID=your_numeric_telegram_id
GITHUB_TOKEN=your_fine_grained_github_token
GITHUB_REPO=joaorema/Palavras
```

`TELEGRAM_WEBHOOK_SECRET` can be any long random string. Telegram will send it back in the webhook header.

## 5. Deploy

Push the project to GitHub and wait for Vercel to deploy.

## 6. Register The Telegram Webhook

After deployment, call this URL in a browser after replacing the values:

```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://palavrasproject.vercel.app/api/telegram&secret_token=<TELEGRAM_WEBHOOK_SECRET>
```

Expected response:

```json
{"ok":true,"result":true}
```

## 7. Test

In Telegram, send:

```text
/status
```

Then send a normal request:

```text
Change the Soletra submit button color
```

The bot should reply with the GitHub issue number and link.

## Safety Model

- Only `TELEGRAM_ALLOWED_USER_ID` can use the bot.
- Telegram webhook calls must include `TELEGRAM_WEBHOOK_SECRET`.
- Messages create GitHub issues only.
- They do not edit code or deploy automatically.
