import HomePresenter from '/scripts/app/presenter/HomePresenter.js';
import AddStoryPresenter from '../scripts/app/presenter/AddStoryPresenter.js';
import DetailPresenter from '../scripts/app/presenter/DetailPresenter.js';
import AuthView from '../scripts/app/views/AuthView.js';
import AuthService from '../scripts/services/AuthService.js';

const routes = {
  '/home': {
    template: '<div id="home-view"></div>',
    presenter: HomePresenter,
    auth: true 
  },
  '/login': {
    template: '<div id="auth-view"></div>',
    init: () => new AuthView('login')
  },
  '/register': {
    template: '<div id="auth-view"></div>',
    init: () => new AuthView('register')
  },
  '/add': {
    template: '<div id="add-story-view"></div>',
    presenter: AddStoryPresenter,
    auth: true
  },
  '/detail/:id': {
    template: '<div id="detail-view"></div>',
    presenter: DetailPresenter,
    auth: true
  },
  'default': {
    template: '<div id="home-view"></div>',
    presenter: HomePresenter,
    auth: true
  }
};

class Router {
  constructor() {
    this.initRouter();
    this.initAppShell();
    this.loadRoute();
  }

  initRouter() {
    window.addEventListener('hashchange', () => this.loadRoute());
  }

  initAppShell() {
    const hamburgerButton = document.getElementById('hamburgerButton');
    const navigationDrawer = document.getElementById('navigationDrawer');

    hamburgerButton.addEventListener('click', (event) => {
      navigationDrawer.classList.toggle('open');
      event.stopPropagation();
    });

    document.addEventListener('click', () => {
      navigationDrawer.classList.remove('open');
    });
  }

  loadRoute() {
    try {
      const hash = window.location.hash.substring(1) || '/login';
      const route = this.getRoute(hash);
      
      // Redirect jika perlu autentikasi
      if (route.auth && !AuthService.isAuthenticated()) {
        window.location.hash = '#/login';
        return;
      }

      const mainContent = document.querySelector('main');
      if (!mainContent) {
        throw new Error('Main content element not found');
      }

      mainContent.innerHTML = route.template;
      
      if (route.init) {
        route.init();
      } else if (route.presenter) {
        const params = this.extractParams(hash);
        new route.presenter(params);
      }
    } catch (error) {
      console.error('Routing error:', error);
      this.showErrorPage(error);
    }
  }

  getRoute(hash) {
    if (hash.startsWith('/detail/')) {
      return routes['/detail/:id'];
    }
    return routes[hash] || routes['default'];
  }

  extractParams(hash) {
    if (hash.startsWith('/detail/')) {
      const id = hash.split('/')[2];
      if (!id) throw new Error('Invalid story ID');
      return { id };
    }
    return {};
  }

  showErrorPage(error) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="error-container">
          <h2>Error</h2>
          <p>${error.message}</p>
          <div class="error-actions">
            <a href="#/home" class="btn">Home</a>
            <a href="#/login" class="btn">Login</a>
          </div>
        </div>
      `;
    }
  }
}
export default Router;