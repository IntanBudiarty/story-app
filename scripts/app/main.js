import Router from '../router.js';
import '../../styles/main.css';
import AuthService from '../services/AuthService.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('main')) {
    document.body.innerHTML = '<main id="main-content"></main>';
  }
  const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
const logoutBtn = document.getElementById('logoutButton');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      AuthService.logout();
      window.location.hash = '#/login';
    });
  }
  new Router();
});