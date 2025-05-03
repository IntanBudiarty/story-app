<<<<<<< HEAD
import { showLoading, hideLoading } from '../utils/loader.js';

class HomeView {
  constructor() {
    this.userProfileContainer = document.createElement('div');
    this.userProfileContainer.className = 'user-profile';
  }

  showLoading() {
    const mainContent = this._getMainContent();
    mainContent.innerHTML = `
      <h2>Recent Stories</h2>
      <div class="loading">
        <div class="loading-spinner"></div>
      </div>
      <div id="map"></div>
    `;
  }

  showStories(stories) {
    const mainContent = this._getMainContent();
    
    if (!stories || stories.length === 0) {
      mainContent.innerHTML = `
        <h2>Recent Stories</h2>
        <p>No stories found. Be the first to share your story!</p>
        <div id="map"></div>
      `;
      return;
    }
    
    const storiesHTML = stories.map(story => `
      <article class="story-card" data-id="${story.id}">
        ${story.photoUrl ? `
          <img src="${story.photoUrl}" 
               alt="${story.name || 'Story'}'s image" 
               class="story-image"
               onerror="this.remove()"> 
        ` : ''}
        <div class="story-content">
          <h3 class="story-title">${story.name || 'Untitled Story'}</h3>
          <p class="story-description">${story.description || 'No description available'}</p>
          <div class="story-meta">
            <span>${story.createdAt ? new Date(story.createdAt).toLocaleDateString() : 'Unknown date'}</span>
            <span>${story.name || 'Unknown author'}</span>
          </div>
          <button class="view-detail-btn" data-id="${story.id}">
            View Detail
          </button>
        </div>
      </article>
    `).join('');
    
    mainContent.innerHTML = `
      <h2>Recent Stories</h2>
      <div class="stories-container">
        ${storiesHTML}
      </div>
      <div id="map"></div>
    `;

    this._initViewDetailButtons();
  }

  showError(message) {
    const mainContent = this._getMainContent();
    mainContent.innerHTML = `
      <h2>Recent Stories</h2>
      <div class="error-message">
        <p>${message}</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    `;
  }

  showUserProfile(user) {
    if (!user) return;
    
    const profileHTML = `
      <div class="user-info">
        <h3>Welcome, ${user.name || 'User'}</h3>
        <button id="logout-btn" class="btn">Logout</button>
      </div>
    `;
    
    const mainContent = this._getMainContent();
    let profileContainer = mainContent.querySelector('.user-profile');
    
    if (!profileContainer) {
      profileContainer = document.createElement('div');
      profileContainer.className = 'user-profile';
      mainContent.prepend(profileContainer);
    }
    
    profileContainer.innerHTML = profileHTML;
  }

  _initViewDetailButtons() {
    document.querySelectorAll('.view-detail-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const storyId = e.currentTarget.getAttribute('data-id');
        if (storyId) {
          window.location.hash = `#/detail/${storyId}`;
        }
      });
    });
  }

  _getMainContent() {
    const mainContent = document.querySelector('main');
    if (!mainContent) {
      console.error('Main content element not found');
      return document.body;
    }
    return mainContent;
  }
}
async function renderStories() {
  showLoading();
  try {
    const stories = await storyPresenter.getStories();
    // tampilkan data
  } catch (error) {
    alert(error.message);
  } finally {
    hideLoading();
  }
}


=======
import { showLoading, hideLoading } from '../utils/loader.js';

class HomeView {
  constructor() {
    this.userProfileContainer = document.createElement('div');
    this.userProfileContainer.className = 'user-profile';
  }

  showLoading() {
    const mainContent = this._getMainContent();
    mainContent.innerHTML = `
      <h2>Recent Stories</h2>
      <div class="loading">
        <div class="loading-spinner"></div>
      </div>
      <div id="map"></div>
    `;
  }

  showStories(stories) {
    const mainContent = this._getMainContent();
    
    if (!stories || stories.length === 0) {
      mainContent.innerHTML = `
        <h2>Recent Stories</h2>
        <p>No stories found. Be the first to share your story!</p>
        <div id="map"></div>
      `;
      return;
    }
    
    const storiesHTML = stories.map(story => `
      <article class="story-card" data-id="${story.id}">
        ${story.photoUrl ? `
          <img src="${story.photoUrl}" 
               alt="${story.name || 'Story'}'s image" 
               class="story-image"
               onerror="this.remove()"> 
        ` : ''}
        <div class="story-content">
          <h3 class="story-title">${story.name || 'Untitled Story'}</h3>
          <p class="story-description">${story.description || 'No description available'}</p>
          <div class="story-meta">
            <span>${story.createdAt ? new Date(story.createdAt).toLocaleDateString() : 'Unknown date'}</span>
            <span>${story.name || 'Unknown author'}</span>
          </div>
          <button class="view-detail-btn" data-id="${story.id}">
            View Detail
          </button>
        </div>
      </article>
    `).join('');
    
    mainContent.innerHTML = `
      <h2>Recent Stories</h2>
      <div class="stories-container">
        ${storiesHTML}
      </div>
      <div id="map"></div>
    `;

    this._initViewDetailButtons();
  }

  showError(message) {
    const mainContent = this._getMainContent();
    mainContent.innerHTML = `
      <h2>Recent Stories</h2>
      <div class="error-message">
        <p>${message}</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    `;
  }

  showUserProfile(user) {
    if (!user) return;
    
    const profileHTML = `
      <div class="user-info">
        <h3>Welcome, ${user.name || 'User'}</h3>
        <button id="logout-btn" class="btn">Logout</button>
      </div>
    `;
    
    const mainContent = this._getMainContent();
    let profileContainer = mainContent.querySelector('.user-profile');
    
    if (!profileContainer) {
      profileContainer = document.createElement('div');
      profileContainer.className = 'user-profile';
      mainContent.prepend(profileContainer);
    }
    
    profileContainer.innerHTML = profileHTML;
  }

  _initViewDetailButtons() {
    document.querySelectorAll('.view-detail-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const storyId = e.currentTarget.getAttribute('data-id');
        if (storyId) {
          window.location.hash = `#/detail/${storyId}`;
        }
      });
    });
  }

  _getMainContent() {
    const mainContent = document.querySelector('main');
    if (!mainContent) {
      console.error('Main content element not found');
      return document.body;
    }
    return mainContent;
  }
}
async function renderStories() {
  showLoading();
  try {
    const stories = await storyPresenter.getStories();
    // tampilkan data
  } catch (error) {
    alert(error.message);
  } finally {
    hideLoading();
  }
}


>>>>>>> 03606de99c3eb3b222071ef32a676d77374bf572
export default HomeView;