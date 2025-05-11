import AuthService from '../../services/AuthService.js';

class AuthView {
   constructor(mode = 'login') {
    this.mode = mode;
    this._presenter = null;
    this._render();
  }
  init() {
  this._render();
}


  bindPresenter(presenter) {
    this._presenter = presenter;
  }

  _render() {
    const container = document.getElementById('auth-view');
    if (!container) return;

    container.innerHTML = `
      <div class="auth-wrapper">
        <div class="auth-image">
          <img src="assets/images/bg-login.gif" alt="Auth Image">
        </div>
        <div class="auth-content">
          <h2>${this.mode === 'login' ? 'Welcome Back!' : 'Create an Account'}</h2>
          <form id="auth-form">
            ${this.mode === 'register' ? `
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" placeholder="Your name" required>
              </div>
            ` : ''}
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" placeholder="you@example.com" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Minimum 8 characters" required minlength="8">
            </div>
            ${this.mode === 'register' ? `
              <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Retype your password" required minlength="8">
              </div>
            ` : ''}
            <button type="submit" class="btn-primary">
              ${this.mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
          <div id="error-container" style="display:none; color:red; margin-top: 10px;"></div>

          <div class="auth-footer">
            ${this.mode === 'login' 
              ? `Belum punya akun? <a href="#/register">Daftar disini</a>`
              : `Sudah punya akun? <a href="#/login">Login disini</a>`}
          </div>
        </div>
      </div>
    `;

    this._initForm();
  }
  _initForm() {
    const form = document.getElementById('auth-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted');
      if (this._presenter && this._presenter.handleAuthSubmit) {
        const formData = this.getFormData();
        console.log('Form data:', formData);
        this._presenter.handleAuthSubmit(formData);
      }
    });


  }
  
  getFormData() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { email, password };

    if (this.mode === 'register') {
      data.name = document.getElementById('name').value;
      data.confirmPassword = document.getElementById('confirm-password').value;
    }

    return data;
  }

  showLoading() {
    const submitBtn = document.querySelector('#auth-form button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
  }
  resetButton() {
  const submitBtn = document.querySelector('#auth-form button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = this.mode === 'login' ? 'Login' : 'Register';
  }
}
  showError(message) {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.style.display = 'block';  
    }
  }
}

export default AuthView;
