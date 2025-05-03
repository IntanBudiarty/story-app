<<<<<<< HEAD
import AddStoryView from '../views/AddStoryView.js';
import StoryData from '../../data/StoryData.js';
import { initMap, getCurrentLocation } from '../utils/map.js';
import { initCamera, stopCamera ,photoPreview} from '../utils/camera.js';

class AddStoryPresenter {
  constructor() {
    this._addStoryView = new AddStoryView();
    this._initForm().catch(error => {
      console.error('Initialization error:', error);
      this._addStoryView.showError('Failed to initialize form');
    });
  }

  async _initForm() {
    try {
      const map = initMap('add-story-map');
      if (!map) {
        throw new Error('Failed to initialize map');
      }

      try {
        const position = await getCurrentLocation();
        map.setView([position.coords.latitude, position.coords.longitude], 13);
      } catch (error) {
        console.warn('Location error:', error.message);
        map.setView([0, 0], 2);
      }
      
      map.on('click', (e) => {
        this._addStoryView.setCoordinates(e.latlng.lat, e.latlng.lng);
      });

      try {
        await initCamera('cameraPreview', 'captureButton', 'photoPreview');
      } catch (error) {
        console.warn('Camera error:', error.message);
        this._addStoryView.showCameraError();
      }

      // Form submission
      const form = document.getElementById('addStoryForm');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await this._handleFormSubmit();
      });

    } catch (error) {
      console.error('Form initialization failed:', error);
      throw error;
    }
  }

  async _handleFormSubmit() {
    try {
      const description = document.getElementById('description').value;
      const photo = document.getElementById('photoInput').files[0];
      const lat = document.getElementById('latitude').value;
      const lon = document.getElementById('longitude').value;
      
      if (!photo || !description) {
        throw new Error('Please fill all required fields');
      }

      this._addStoryView.showLoading();
      await StoryData.addStory({ photo, description, lat, lon });
      this._addStoryView.showSuccess();
      window.location.hash = '#/home';

    } catch (error) {
      this._addStoryView.showError(error.message);
    } finally {
      stopCamera();
    }
  }
}

=======
import AddStoryView from '../views/AddStoryView.js';
import StoryData from '../../data/StoryData.js';
import { initMap, getCurrentLocation } from '../utils/map.js';
import { initCamera, stopCamera ,photoPreview} from '../utils/camera.js';

class AddStoryPresenter {
  constructor() {
    this._addStoryView = new AddStoryView();
    this._initForm().catch(error => {
      console.error('Initialization error:', error);
      this._addStoryView.showError('Failed to initialize form');
    });
  }

  async _initForm() {
    try {
      const map = initMap('add-story-map');
      if (!map) {
        throw new Error('Failed to initialize map');
      }

      try {
        const position = await getCurrentLocation();
        map.setView([position.coords.latitude, position.coords.longitude], 13);
      } catch (error) {
        console.warn('Location error:', error.message);
        map.setView([0, 0], 2);
      }
      
      map.on('click', (e) => {
        this._addStoryView.setCoordinates(e.latlng.lat, e.latlng.lng);
      });

      try {
        await initCamera('cameraPreview', 'captureButton', 'photoPreview');
      } catch (error) {
        console.warn('Camera error:', error.message);
        this._addStoryView.showCameraError();
      }

      // Form submission
      const form = document.getElementById('addStoryForm');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await this._handleFormSubmit();
      });

    } catch (error) {
      console.error('Form initialization failed:', error);
      throw error;
    }
  }

  async _handleFormSubmit() {
    try {
      const description = document.getElementById('description').value;
      const photo = document.getElementById('photoInput').files[0];
      const lat = document.getElementById('latitude').value;
      const lon = document.getElementById('longitude').value;
      
      if (!photo || !description) {
        throw new Error('Please fill all required fields');
      }

      this._addStoryView.showLoading();
      await StoryData.addStory({ photo, description, lat, lon });
      this._addStoryView.showSuccess();
      window.location.hash = '#/home';

    } catch (error) {
      this._addStoryView.showError(error.message);
    } finally {
      stopCamera();
    }
  }
}

>>>>>>> 03606de99c3eb3b222071ef32a676d77374bf572
export default AddStoryPresenter;