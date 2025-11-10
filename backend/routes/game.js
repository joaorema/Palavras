// routes/game.js
const db = require('../db');

async function routes(fastify, options) 
{
  // This endpoint increments the user's win count for a given game type.
  fastify.post('/win', { preValidation: [fastify.authenticate] }, async (request, reply) => {
    const userId = request.user.id || request.user.userId;; // This comes from JWT
    const { gameType } = request.body;

    if (!gameType) {
      return reply.code(400).send({ error: 'Missing gameType' });
    }

    // Update the win count and stats for the user  
    const stmt = db.prepare(`
      UPDATE game_stats
      SET wins = wins + 1
      WHERE user_id = ? AND game_type = ?
    `);
    const result = stmt.run(userId, gameType);
    console.log(result);

    if (result.changes === 0) {
      return reply.code(404).send({ error: 'Game stats not found for this user/gameType' });
    }

    return { success: true };
  });

  // This endpoint retrieves the player's wins for all game types
  fastify.get('/wins', { preValidation: [fastify.authenticate] }, async (request, reply) => {
    const userId = request.user.id || request.user.userId;

    // Get all game stats for the user
    const stmt = db.prepare(`
      SELECT game_type, wins, losses, level, current_streak, best_streak
      FROM game_stats
      WHERE user_id = ?
    `);
    const stats = stmt.all(userId);

    if (stats.length === 0) {
      return reply.code(404).send({ error: 'No game stats found for this user' });
    }

    // Calculate total wins across all games
    const totalWins = stats.reduce((sum, stat) => sum + stat.wins, 0);

    return { totalWins, stats };
  });
}
module.exports = routes