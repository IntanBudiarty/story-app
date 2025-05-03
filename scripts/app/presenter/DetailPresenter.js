import DetailView from '/scripts/app/views/DetailView.js';
import StoryData from '/scripts/data/StoryData.js';
import { initMap, showStoryOnMap } from '../utils/map.js';

class DetailPresenter {
  constructor(params) {
    this._params = params;
    this._detailView = new DetailView();
    this._showStory();
  }

  async _showStory() {
    try {
      this._detailView.showLoading();
      
      const story = await StoryData.getStoryById(this._params.id);
      
      if (!story) {
        throw new Error('Story not found');
      }

      const processedStory = this._processStoryData(story);
      this._detailView.showStory(processedStory);
      
      this._initMapWithStory(processedStory);
    } catch (error) {
      console.error('Failed to load story:', error);
      this._detailView.showError(error.message || 'Failed to load story details');
    }
  }

  _processStoryData(story) {
    return {
      ...story,
      name: story.name || 'Unknown Story',
      description: story.description || 'No description available',
      photoUrl: story.photoUrl || 'assets/images/icons/default-image.jpg',
      createdAt: story.createdAt || new Date().toISOString(),
      lat: story.lat || -6.2088, 
      lon: story.lon || 106.8456 
    };
  }

  _initMapWithStory(story) {
    setTimeout(() => {
      try {
        const map = initMap('detail-map');
        if (map && story.lat && story.lon) {
          showStoryOnMap(map, story);
        }
      } catch (mapError) {
        console.error('Map initialization error:', mapError);
      }
    }, 50);
  }
}

export default DetailPresenter;