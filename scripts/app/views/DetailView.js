class DetailView {
  showLoading() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
      <div class="detail-loading">
        <div class="spinner"></div>
        <p>Loading story details...</p>
      </div>
    `;
  }

  showStory(story) {
    if (!story) {
      this.showError('Invalid story data');
      return;
    }

    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
      <div class="detail-container">
        ${story.photoUrl ? `
          <img src="${story.photoUrl}" 
               alt="${story.name || 'Story'}" 
               class="detail-image"
               onerror="this.style.display='none'">
        ` : ''}
        
        <div class="detail-content">
          <h1>${story.name || 'Untitled Story'}</h1>
          
          <div class="detail-meta">
            <span>By ${story.author || 'Anonymous'}</span>
            <span>${story.createdAt ? new Date(story.createdAt).toLocaleDateString() : 'Unknown date'}</span>
          </div>
          
          <p>${story.description || 'No description available'}</p>
          
          <div id="detail-map" class="detail-map"></div>
          
          <a href="#/home" class="btn-back">Back to Stories</a>
        </div>
      </div>
    `;
  }

  showError(message) {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
      <div class="error-container">
        <p>${message}</p>
        <button id="retry-btn" class="btn">Try Again</button>
      </div>
    `;

    document.getElementById('retry-btn')?.addEventListener('click', () => {
      window.location.reload();
    });
  }
}
export default DetailView;