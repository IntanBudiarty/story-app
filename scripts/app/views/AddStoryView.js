class AddStoryView {
  constructor() {
    this._map = null;
    this._marker = null;
    this._presenter = null;
    this._initForm();
  }

  bindPresenter(presenter) {
    this._presenter = presenter;
  }

  _initForm() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = `
      <h2>Share Your Story</h2>
      <form id="addStoryForm" class="add-story-form">
        <div class="form-group">
          <label for="description">Story Description</label>
          <textarea id="description" required aria-required="true"></textarea>
        </div>
        
        <div class="form-group">
          <label>Add Photo</label>
          <div class="camera-container">
            <video id="cameraPreview" autoplay playsinline aria-label="Camera preview"></video>
            <canvas id="photoCanvas" style="display: none;"></canvas>
            <img id="photoPreviewImage" style="display:none; max-width:100%; margin-top:10px;" />
            <input type="file" id="photoInput" accept="image/*" capture="environment" style="display: none;">
            <div class="camera-buttons">
              <button type="button" id="openCameraBtn" class="btn btn-secondary">Open Camera</button>
              <button type="button" id="captureButton" class="btn btn-primary" style="display: none;">Capture Photo</button>
              <button type="button" id="stopCameraBtn" class="btn btn-danger" style="display: none;">Stop Camera</button>
              <button type="button" id="deletePhotoBtn" class="btn btn-warning" style="display: none;">Delete Photo</button>
              <button type="button" id="uploadPhotoBtn" class="btn btn-secondary">Upload Photo</button>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Location</label>
          <div id="add-story-map" style="height: 300px;"></div>
          <div style="margin-top: 1rem;">
            <label for="latitude">Latitude</label>
            <input type="text" id="latitude" readonly>
            <label for="longitude">Longitude</label>
            <input type="text" id="longitude" readonly>
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary">Share Story</button>
      </form>
    `;

    // Camera button events
    document.getElementById('openCameraBtn')?.addEventListener('click', () => {
      document.getElementById('cameraPreview').style.display = 'block';
      document.getElementById('captureButton').style.display = 'inline-block';
      document.getElementById('stopCameraBtn').style.display = 'inline-block';
      document.getElementById('openCameraBtn').style.display = 'none';
    });

    document.getElementById('uploadPhotoBtn')?.addEventListener('click', () => {
      document.getElementById('photoInput').click();
    });

    document.getElementById('photoInput')?.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const preview = document.getElementById('photoPreviewImage');
        preview.src = URL.createObjectURL(e.target.files[0]);
        preview.style.display = 'block';
        document.getElementById('deletePhotoBtn').style.display = 'inline-block';
      }
    });

    document.getElementById('addStoryForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this._presenter && this._presenter.handleFormSubmit) {
            this._presenter.handleFormSubmit();
        }
        });

  }

  setMapView(map, position) {
    this._map = map;
    const lat = position.coords?.latitude || position.lat;
    const lng = position.coords?.longitude || position.lng;
    this._map.setView([lat, lng], 13);
    this._marker = L.marker([lat, lng]).addTo(this._map);
    this.setCoordinates(lat, lng);
  }

  updateMarkerPosition(latlng) {
    if (this._marker) {
      this._marker.setLatLng(latlng);
    } else {
      this._marker = L.marker(latlng).addTo(this._map);
    }
    this.setCoordinates(latlng.lat, latlng.lng);
  }

  setCoordinates(lat, lng) {
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;
  }

  showLoading() {
    const submitButton = document.querySelector('#addStoryForm button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="loading-spinner small"></span> Sharing...';
    }
  }

  showSuccess() {
    alert('Story shared successfully!');
  }

  showError(message) {
    alert(`Error: ${message}`);
    const submitButton = document.querySelector('#addStoryForm button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Share Story';
    }
  }
  getFormData() {
  const description = document.getElementById('description').value;
  const photoInput = document.getElementById('photoInput');
  const lat = document.getElementById('latitude').value;
  const lng = document.getElementById('longitude').value;

  return {
    description,
    photo: photoInput.files[0],
    lat,
    lng,
  };
}

}

export default AddStoryView;