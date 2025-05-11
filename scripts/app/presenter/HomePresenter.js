import HomeView from '../views/HomeView.js';
import StoryData from '../../data/StoryData.js';
import AuthService from '../../services/AuthService.js';
import { initMap, showStoryOnMap, showStoriesOnMap } from '../utils/map.js';

class HomePresenter {
  constructor() {
    this._homeView = new HomeView();
    this._showUserInfo();
    this._showStories();
    this._initLogoutButton();
  }

  async _showStories() {
    try {
      this._homeView.showLoading();
      const response = await StoryData.getAllStories();
      this._homeView.showStories(response.listStory);

      const map = initMap('map');
      showStoriesOnMap(map, response.listStory);
    } catch (error) {
      this._homeView.showError(error.message);
    }
  }

  _showUserInfo() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this._homeView.showUserProfile(user);
    }
  }

  _initLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        AuthService.logout();
        window.location.hash = '#/login';
      });
    }
  }
}
export default HomePresenter;