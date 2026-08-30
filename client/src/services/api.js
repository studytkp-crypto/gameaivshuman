/**
 * API Client for Human vs AI platform
 */

const API_BASE = '/api';

export class API {
  static getHeaders() {
    const token = localStorage.getItem('hvai_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  static async request(endpoint, options = {}) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers
        }
      });

      const contentType = res.headers.get('content-type') || '';
      let data = {};

      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        if (!res.ok) {
          throw new Error(text || `Server returned HTTP ${res.status}`);
        }
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = { message: text };
        }
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed (${res.status})`);
      }
      return data;
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error('Cannot connect to backend server. Make sure the server is running on http://127.0.0.1:5000.');
      }
      throw err;
    }
  }

  // Auth
  static register(email, password, name) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });
  }

  static login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  static getMe() {
    return this.request('/auth/me');
  }

  // Game Loop
  static getRound(category = 'All', excludeId = null) {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (excludeId) params.append('excludeId', excludeId);
    const qs = params.toString();
    return this.request(`/game/round${qs ? `?${qs}` : ''}`);
  }

  static submitGuess(roundId, chosenSlot) {
    return this.request('/game/guess', {
      method: 'POST',
      body: JSON.stringify({ roundId, chosenSlot })
    });
  }

  static getDailyChallenge() {
    return this.request('/game/daily');
  }

  // Leaderboards
  static getLeaderboard(type = 'all-time') {
    return this.request(`/leaderboard/${type}`);
  }

  // Stripe & Premium
  static createCheckoutSession() {
    return this.request('/stripe/create-checkout-session', { method: 'POST' });
  }

  static simulateUpgrade() {
    return this.request('/stripe/simulate-upgrade', { method: 'POST' });
  }

  // Admin
  static getAdminPairs() {
    return this.request('/admin/pairs');
  }

  static generateAiPair(category, customPrompt) {
    return this.request('/admin/generate-pair', {
      method: 'POST',
      body: JSON.stringify({ category, customPrompt })
    });
  }

  static deletePair(id) {
    return this.request(`/admin/pair/${id}`, { method: 'DELETE' });
  }

  // Stats
  static getStatsSummary() {
    return this.request('/stats/summary');
  }

  static getUserCategories() {
    return this.request('/stats/user-categories');
  }
}
