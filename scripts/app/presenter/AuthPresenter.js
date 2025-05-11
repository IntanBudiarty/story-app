import AuthService from '../../services/AuthService.js';

class AuthPresenter {
  constructor(view, mode = 'login') {
    this._view = view;
    this._mode = mode;
    this._view.init(); 
    this._view.bindPresenter(this); // Bind presenter ke view jika perlu
  }

  async handleAuthSubmit(formData) {
    console.log('handleAuthSubmit dipanggil dengan:', formData);
    try {
      this._view.showLoading(); // Menampilkan indikator loading
      const { name, email, password, confirmPassword } = formData;

      if (this._mode === 'login') {
        // Proses login
        await AuthService.login({ email, password });
        window.location.hash = '#/home';
      } else {
        // Proses registrasi
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await AuthService.register({ name, email, password });
        alert('Registration successful! Please login.');
        window.location.hash = '#/login';
      }

    } catch (error) {
      // Menampilkan pesan error jika terjadi kesalahan
      this._view.showError(error.message);
    } finally {
      this._view.resetButton(); // Mereset tombol setelah proses selesai
    }
  }
}

export default AuthPresenter;
