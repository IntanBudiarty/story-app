<<<<<<< HEAD
const API_BASE_URL = 'https://story-api.dicoding.dev/v1';

class AuthService {
  static async register({ name, email, password }) {
    try {
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim()
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }

      return responseData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login({ email, password }) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim()
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      if (!responseData.loginResult?.token) {
        throw new Error('Invalid server response');
      }

      localStorage.setItem('token', responseData.loginResult.token);
      localStorage.setItem('user', JSON.stringify({
        id: responseData.loginResult.userId,
        name: responseData.loginResult.name,
        email: email.trim().toLowerCase()
      }));

      return responseData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
}

=======
const API_BASE_URL = 'https://story-api.dicoding.dev/v1';

class AuthService {
  static async register({ name, email, password }) {
    try {
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim()
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }

      return responseData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login({ email, password }) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim()
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      if (!responseData.loginResult?.token) {
        throw new Error('Invalid server response');
      }

      localStorage.setItem('token', responseData.loginResult.token);
      localStorage.setItem('user', JSON.stringify({
        id: responseData.loginResult.userId,
        name: responseData.loginResult.name,
        email: email.trim().toLowerCase()
      }));

      return responseData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
}

>>>>>>> 03606de99c3eb3b222071ef32a676d77374bf572
export default AuthService;