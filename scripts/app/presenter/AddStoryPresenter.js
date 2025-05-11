import AddStoryView from '../views/AddStoryView.js';
import StoryData from '../../data/StoryData.js';
import { initMap, getCurrentLocation } from '../utils/map.js';
import { initCamera, stopCamera } from '../utils/camera.js';

class AddStoryPresenter {
  constructor() {
    this._view = new AddStoryView();
    this._view.bindPresenter(this); // Now this will work
    this._initMap();
    this._initCamera();
  }

  async _initMap() {
    try {
      const map = initMap('add-story-map');
      if (!map) throw new Error('Failed to initialize map');

      try {
        const position = await getCurrentLocation();
        this._view.setMapView(map, position);
      } catch (error) {
        console.warn('Location error:', error.message);
        this._view.setMapView(map, { lat: 0, lng: 0 });
      }

      map.on('click', (e) => {
        this._view.updateMarkerPosition(e.latlng);
      });

    } catch (error) {
      this._view.showError('Failed to initialize map: ' + error.message);
    }
  }

  async _initCamera() {
    try {
      await initCamera('cameraPreview', 'captureButton', 'photoPreview');
    } catch (error) {
      this._view.showError('Camera initialization failed: ' + error.message);
    }
  }

 async handleFormSubmit() {
  try {
    this._view.showLoading();

    const { photo, description, lat, lng } = this._view.getFormData();

    if (!photo || !description) {
      throw new Error('Please fill all required fields');
    }

    await StoryData.addStory({ photo, description, lat, lng });
    this._view.showSuccess();
    window.location.hash = '#/home';
  } catch (error) {
    this._view.showError(error.message);
  } finally {
    stopCamera();
  }
}

}

export default AddStoryPresenter;