const bcrypt = require('bcrypt');
const db = require('../db');

/**
 * Authentication routes
 * Handles user signup and login
 */
async function authRoutes(fastify, options) {
  
  /**
   * POST /auth/signup
   * Creates a new user account
   */
  fastify.post('/signup', async (request, reply) => {
    const { username, email, password } = request.body;

    // Validation - check if all fields are provided
    if (!username || !email || !password) {
      return reply.code(400).send({ 
        error: 'Username, email, and password are required' 
      });
    }

    // Password strength check (minimum 6 characters)
    if (password.length < 6) {
      return reply.code(400).send({ 
        error: 'Password must be at least 6 characters' 
      });
    }

    try {
      // Hash password (encrypt it) - NEVER store plain passwords!
      // The number 10 is the "salt rounds" - higher = more secure but slower
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      const insert = db.prepare(`
        INSERT INTO users (username, email, password) 
        VALUES (?, ?, ?)
      `);
      
      const result = insert.run(username, email, hashedPassword);

      // Create JWT token - this is what keeps users logged in
      const token = fastify.jwt.sign({ 
        userId: result.lastInsertRowid,
        username: username 
      });

      // Initialize game stats for both game types
      const initStats = db.prepare(`
        INSERT INTO game_stats (user_id, game_type)
        VALUES (?, ?)
      `);
      initStats.run(result.lastInsertRowid, 'wordle');
      initStats.run(result.lastInsertRowid, 'connections');

      return reply.send({ 
        message: 'User created successfully',
        token,
        user: { id: result.lastInsertRowid, username, email }
      });

    } catch (error) {
      // Handle duplicate username/email (UNIQUE constraint violation)
      if (error.code === 'SQLITE_CONSTRAINT') {
        return reply.code(409).send({ 
          error: 'Username or email already exists' 
        });
      }
      
      console.error('Signup error:', error);
      return reply.code(500).send({ error: 'Server error' });
    }
  });

  /**
   * POST /auth/login
   * Authenticates existing user
   */
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.code(400).send({ 
        error: 'Username and password are required' 
      });
    }

    try {
      // Find user in database
      const user = db.prepare('SELECT * FROM users WHERE username = ?')
        .get(username);

      if (!user) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }

      // Compare provided password with hashed password in database
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return reply.code(401).send({ error: 'Invalid credentials' });
      }

      // Create JWT token
      const token = fastify.jwt.sign({ 
        userId: user.id,
        username: user.username 
      });

      return reply.send({ 
        message: 'Login successful',
        token,
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email 
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      return reply.code(500).send({ error: 'Server error' });
    }
  });

  /**
   * GET /auth/verify
   * Verifies if a token is still valid
   * Requires authentication (see onRequest hook below)
   */
  fastify.get('/verify', {
    onRequest: [fastify.authenticate]  // This checks the JWT token
  }, async (request, reply) => {
    // If we get here, token is valid
    // request.user is set by the authenticate hook
    return reply.send({ 
      valid: true,
      user: request.user 
    });
  });
}

module.exports = authRoutes;