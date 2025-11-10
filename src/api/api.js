const API_URL = 'http://localhost:3000';

export const api = {
  // Register a new user
  async register(username, email, password) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    // Save the token to localStorage (this keeps the user logged in)
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  },

  // Login existing user
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }), // Using email as username for now
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is logged in
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  async addWin(gameType)
  {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No JWT token found! Please login.");
    //console.log(token);
    const response = await fetch('http://localhost:3000/api/game/win', {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({gameType}),
    });
    const data = await response.json();
    if(!response.ok)
      throw new Error(data.error || 'Failed to update wins!');
    return data;
  },

  async getWins()
  {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No JWT token found! Please login.");
    
    const response = await fetch('http://localhost:3000/api/game/wins', {
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if(!response.ok)
      throw new Error(data.error || 'Failed to fetch wins!');
    return data;
  }
};