<<<<<<< HEAD
import AuthService from '../../services/AuthService.js';

class AuthView {
  constructor(mode = 'login') {
    this.mode = mode;
    this._render();
  }

  _render() {
    const container = document.getElementById('auth-view');
    if (!container) return;
    
    container.innerHTML = `
      <div class="auth-container">
        <h2>${this.mode === 'login' ? 'Login' : 'Register'}</h2>
        <form id="auth-form">
          ${this.mode === 'register' ? `
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" required>
            </div>
            <div class="form-group">
              <label for="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" required minlength="8">
            </div>
          ` : ''}
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required minlength="8">
          </div>
          <button type="submit" class="btn btn-primary">
            ${this.mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <div class="auth-footer">
          ${this.mode === 'login' 
            ? 'Belum punya akun? <a href="#/register">Daftar disini</a>'
            : 'Sudah punya akun? <a href="#/login">Login disini</a>'}
        </div>
      </div>
    `;
    
    this._initForm();
  }

  _initForm() {
    const form = document.getElementById('auth-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (this.mode === 'login') {
          await AuthService.login({ email, password });
          window.location.hash = '#/home';
        } else {
          const name = document.getElementById('name').value;
          const confirmPassword = document.getElementById('confirm-password').value;
          
          if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
          }
          
          await AuthService.register({ name, email, password });
          alert('Registration successful! Please login.');
          window.location.hash = '#/login';
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = this.mode === 'login' ? 'Login' : 'Register';
      }
    });
  }
}

=======
import AuthService from '../../services/AuthService.js';

class AuthView {
  constructor(mode = 'login') {
    this.mode = mode;
    this._render();
  }

  _render() {
    const container = document.getElementById('auth-view');
    if (!container) return;
    
    container.innerHTML = `
      <div class="auth-container">
        <h2>${this.mode === 'login' ? 'Login' : 'Register'}</h2>
        <form id="auth-form">
          ${this.mode === 'register' ? `
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" required>
            </div>
            <div class="form-group">
              <label for="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" required minlength="8">
            </div>
          ` : ''}
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required minlength="8">
          </div>
          <button type="submit" class="btn btn-primary">
            ${this.mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <div class="auth-footer">
          ${this.mode === 'login' 
            ? 'Belum punya akun? <a href="#/register">Daftar disini</a>'
            : 'Sudah punya akun? <a href="#/login">Login disini</a>'}
        </div>
      </div>
    `;
    
    this._initForm();
  }

  _initForm() {
    const form = document.getElementById('auth-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (this.mode === 'login') {
          await AuthService.login({ email, password });
          window.location.hash = '#/home';
        } else {
          const name = document.getElementById('name').value;
          const confirmPassword = document.getElementById('confirm-password').value;
          
          if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
          }
          
          await AuthService.register({ name, email, password });
          alert('Registration successful! Please login.');
          window.location.hash = '#/login';
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = this.mode === 'login' ? 'Login' : 'Register';
      }
    });
  }
}

>>>>>>> 03606de99c3eb3b222071ef32a676d77374bf572
export default AuthView;