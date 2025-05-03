<<<<<<< HEAD
class AddStoryView {
    constructor() {
        this._renderForm();
    }

    _renderForm() {
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
        document.getElementById('openCameraBtn').addEventListener('click', () => {
            document.getElementById('cameraPreview').style.display = 'block';
            document.getElementById('captureButton').style.display = 'inline-block';
            document.getElementById('stopCameraBtn').style.display = 'inline-block';
            document.getElementById('openCameraBtn').style.display = 'none';
        });

        document.getElementById('uploadPhotoBtn').addEventListener('click', () => {
            document.getElementById('photoInput').click();
        });

        document.getElementById('photoInput').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                document.getElementById('cameraPreview').style.display = 'none';
                document.getElementById('captureButton').style.display = 'none';
                document.getElementById('stopCameraBtn').style.display = 'none';
                document.getElementById('openCameraBtn').style.display = 'inline-block';

                const preview = document.getElementById('photoPreviewImage');
                preview.src = URL.createObjectURL(e.target.files[0]);
                preview.style.display = 'block';
                document.getElementById('deletePhotoBtn').style.display = 'inline-block';
            }
        });

        document.getElementById('deletePhotoBtn').addEventListener('click', () => {
            document.getElementById('photoPreviewImage').src = '';
            document.getElementById('photoPreviewImage').style.display = 'none';
            document.getElementById('photoInput').value = '';
            document.getElementById('deletePhotoBtn').style.display = 'none';
        });
    }

    setCoordinates(lat, lon) {
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lon;
    }

    showLoading() {
        const form = document.getElementById('addStoryForm');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner small"></span> Sharing...';
    }

    showSuccess() {
        alert('Story shared successfully!');
    }

    showError(message) {
        const form = document.getElementById('addStoryForm');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'Share Story';
        
        alert(`Error: ${message}`);
    }
}

export default AddStoryView;
=======
class AddStoryView {
    constructor() {
        this._renderForm();
    }

    _renderForm() {
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
        document.getElementById('openCameraBtn').addEventListener('click', () => {
            document.getElementById('cameraPreview').style.display = 'block';
            document.getElementById('captureButton').style.display = 'inline-block';
            document.getElementById('stopCameraBtn').style.display = 'inline-block';
            document.getElementById('openCameraBtn').style.display = 'none';
        });

        document.getElementById('uploadPhotoBtn').addEventListener('click', () => {
            document.getElementById('photoInput').click();
        });

        document.getElementById('photoInput').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                document.getElementById('cameraPreview').style.display = 'none';
                document.getElementById('captureButton').style.display = 'none';
                document.getElementById('stopCameraBtn').style.display = 'none';
                document.getElementById('openCameraBtn').style.display = 'inline-block';

                const preview = document.getElementById('photoPreviewImage');
                preview.src = URL.createObjectURL(e.target.files[0]);
                preview.style.display = 'block';
                document.getElementById('deletePhotoBtn').style.display = 'inline-block';
            }
        });

        document.getElementById('deletePhotoBtn').addEventListener('click', () => {
            document.getElementById('photoPreviewImage').src = '';
            document.getElementById('photoPreviewImage').style.display = 'none';
            document.getElementById('photoInput').value = '';
            document.getElementById('deletePhotoBtn').style.display = 'none';
        });
    }

    setCoordinates(lat, lon) {
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lon;
    }

    showLoading() {
        const form = document.getElementById('addStoryForm');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner small"></span> Sharing...';
    }

    showSuccess() {
        alert('Story shared successfully!');
    }

    showError(message) {
        const form = document.getElementById('addStoryForm');
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'Share Story';
        
        alert(`Error: ${message}`);
    }
}

export default AddStoryView;
>>>>>>> 03606de99c3eb3b222071ef32a676d77374bf572
