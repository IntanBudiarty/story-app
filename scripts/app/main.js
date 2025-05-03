import Router from '../router.js';
import '../../styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('main')) {
    document.body.innerHTML = '<main id="main-content"></main>';
  }
  const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

  
  new Router();
});