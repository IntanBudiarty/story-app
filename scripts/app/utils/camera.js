<<<<<<< HEAD
let stream = null;

export function initCamera(videoElementId, captureButtonId) {
    const video = document.getElementById(videoElementId);
    const captureButton = document.getElementById(captureButtonId);
    const stopButton = document.getElementById('stopCameraBtn');

    if (!video || !captureButton) return;

    // Jika sebelumnya ada stream, hentikan dulu
    if (stream) {
        stopCamera();
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(s) {
            stream = s;
            video.srcObject = stream;
            video.play();

            video.style.display = 'block';
            captureButton.style.display = 'inline-block';
            stopButton.style.display = 'inline-block';
        })
        .catch(function(err) {
            console.error("An error occurred while opening the camera: ", err);
            alert("Failed to access camera. Please allow camera access or use another device.");
        });

    captureButton.addEventListener('click', function() {
        capturePhoto(videoElementId, 'photoInput', 'photoPreviewImage');
    });

    stopButton.addEventListener('click', () => {
        stopCamera();

        video.srcObject = null;
        video.style.display = 'none';
        captureButton.style.display = 'none';
        stopButton.style.display = 'none';
        document.getElementById('openCameraBtn').style.display = 'inline-block';
    });
}

export function capturePhoto(videoElementId, photoInputId, previewImageId) {
    const video = document.getElementById(videoElementId);
    const canvas = document.createElement('canvas');
    const photoInput = document.getElementById(photoInputId);
    const previewImage = document.getElementById(previewImageId);

    if (!video || !photoInput) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    if (previewImage) {
        previewImage.src = canvas.toDataURL('image/jpeg', 0.95);
        previewImage.style.display = 'block';
    }

    canvas.toBlob(function(blob) {
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        photoInput.files = dataTransfer.files;

        const event = new Event('change');
        photoInput.dispatchEvent(event);
    }, 'image/jpeg', 0.95);

    document.getElementById('deletePhotoBtn').style.display = 'inline-block';
}

export function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null; // <-- reset stream biar bisa restart kamera
    }
}
=======
let stream = null;

export function initCamera(videoElementId, captureButtonId) {
    const video = document.getElementById(videoElementId);
    const captureButton = document.getElementById(captureButtonId);
    const stopButton = document.getElementById('stopCameraBtn');

    if (!video || !captureButton) return;

    // Jika sebelumnya ada stream, hentikan dulu
    if (stream) {
        stopCamera();
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(s) {
            stream = s;
            video.srcObject = stream;
            video.play();

            video.style.display = 'block';
            captureButton.style.display = 'inline-block';
            stopButton.style.display = 'inline-block';
        })
        .catch(function(err) {
            console.error("An error occurred while opening the camera: ", err);
            alert("Failed to access camera. Please allow camera access or use another device.");
        });

    captureButton.addEventListener('click', function() {
        capturePhoto(videoElementId, 'photoInput', 'photoPreviewImage');
    });

    stopButton.addEventListener('click', () => {
        stopCamera();

        video.srcObject = null;
        video.style.display = 'none';
        captureButton.style.display = 'none';
        stopButton.style.display = 'none';
        document.getElementById('openCameraBtn').style.display = 'inline-block';
    });
}

export function capturePhoto(videoElementId, photoInputId, previewImageId) {
    const video = document.getElementById(videoElementId);
    const canvas = document.createElement('canvas');
    const photoInput = document.getElementById(photoInputId);
    const previewImage = document.getElementById(previewImageId);

    if (!video || !photoInput) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    if (previewImage) {
        previewImage.src = canvas.toDataURL('image/jpeg', 0.95);
        previewImage.style.display = 'block';
    }

    canvas.toBlob(function(blob) {
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        photoInput.files = dataTransfer.files;

        const event = new Event('change');
        photoInput.dispatchEvent(event);
    }, 'image/jpeg', 0.95);

    document.getElementById('deletePhotoBtn').style.display = 'inline-block';
}

export function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null; // <-- reset stream biar bisa restart kamera
    }
}
>>>>>>> 03606de99c3eb3b222071ef32a676d77374bf572
