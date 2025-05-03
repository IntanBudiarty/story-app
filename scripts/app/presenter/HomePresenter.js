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
    async getStories() {
      try {
        const response = await StoryData.getStories();
        return response;
      } catch (error) {
        throw new Error('Gagal memuat cerita!');
      }
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
renderStoryList(stories) {
  return `
    <div class="story-list">
      ${stories.map(story => `
        <article class="story-card" data-id="${story.id}">
          <img src="${story.photoUrl || 'assets/images/default-thumbnail.jpg'}" 
               alt="${story.name}" 
               class="story-image"
               onerror="this.onerror=null;this.src='assets/images/default-thumbnail.jpg'">
          
          <div class="story-content">
            <h3>${story.name}</h3>
            <p>${story.description.substring(0, 100)}...</p>
            <a href="#/detail/${story.id}" class="btn btn-detail">View Detail</a>
            </button>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

initViewDetailButtons() {
  document.querySelectorAll('.btn-view-detail').forEach(button => {
    button.addEventListener('click', (e) => {
      const storyId = e.target.getAttribute('data-id');
      window.location.hash = `#/detail/${storyId}`;
    });
  });
}
}

export default HomePresenter;