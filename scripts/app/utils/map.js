<<<<<<< HEAD
let mapInstances = {};

/**
 * Mendapatkan lokasi pengguna saat ini
 * @returns {Promise<GeolocationPosition>}
 * @throws {Error} Jika geolokasi tidak didukung atau gagal
 */
export async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => {
                let errorMessage = 'Error getting your location';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access was denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out';
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    });
}

/**
 * Menginisialisasi peta Leaflet dengan tambahan layer control dan transisi
 * @param {string} elementId - ID elemen container untuk peta
 * @returns {L.Map|null} Instance peta Leaflet atau null jika gagal
 */
export function initMap(elementId) {
    // Hapus instance sebelumnya jika ada
    if (mapInstances[elementId]) {
        mapInstances[elementId].remove();
        delete mapInstances[elementId];
    }

    // Periksa apakah container ada
    const container = document.getElementById(elementId);
    if (!container) {
        console.error(`Map container #${elementId} not found`);
        return null;
    }

    // Pastikan container memiliki dimensi
    container.style.height = container.style.height || '400px';
    container.style.width = container.style.width || '100%';

    // Buat peta baru dengan transisi animasi dan pengaturan zoom yang lebih halus
    const map = L.map(elementId, {
        zoomControl: true,
        dragging: true,
        tap: false, // Untuk menghindari masalah di mobile
        fadeAnimation: true // Transisi animasi ketika berpindah antar layer
    }).setView([-6.1754, 106.8272], 10); // Default ke Jakarta

    // Menambahkan beberapa tile layer
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 2
    });

    const satelliteLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 2
    });

    // Tambahkan kontrol layer
    const baseMaps = {
        "OpenStreetMap": osmLayer,
        "Satellite": satelliteLayer
    };

    L.control.layers(baseMaps).addTo(map);

    // Gunakan OpenStreetMap sebagai default
    osmLayer.addTo(map);

    // Simpan instance
    mapInstances[elementId] = map;
    return map;
}

/**
 * Menampilkan story di peta
 * @param {L.Map} map - Instance peta Leaflet
 * @param {Object} story - Data story
 * @param {number} story.lat - Latitude
 * @param {number} story.lon - Longitude
 * @param {string} [story.name] - Nama story
 * @param {string} [story.description] - Deskripsi story
 */
export function showStoryOnMap(map, story) {
    if (!map || !map.setView || !story?.lat || !story?.lon) {
        console.error('Invalid map or story data');
        return;
    }

    const lat = Number(story.lat);
    const lon = Number(story.lon);
    
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        console.error('Invalid coordinates:', story.lat, story.lon);
        return;
    }

    map.setView([lat, lon], 13);

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    const storyName = story.name || 'Unknown Story';
    const description = story.description 
        ? `${story.description.substring(0, 100)}${story.description.length > 100 ? '...' : ''}`
        : 'No description available';

    const marker = L.marker([lat, lon], {
        title: storyName,
        alt: `Story location: ${storyName}`
    }).addTo(map);
    
    marker.bindPopup(`
        <div class="map-popup">
            <h3>${storyName}</h3>
            <p>${description}</p>
        </div>
    `).openPopup();
}

/**
 * Menampilkan multiple stories di peta
 * @param {L.Map} map - Instance peta Leaflet
 * @param {Array} stories - Array of story objects
 */
export function showStoriesOnMap(map, stories) {
    if (!map || !Array.isArray(stories)) return;

    const validStories = stories.filter(story => {
        const lat = Number(story?.lat);
        const lon = Number(story?.lon);
        return !isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
    });

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    validStories.forEach(story => {
        const storyName = story.name || 'Untitled Story';
        const description = story.description 
            ? `${story.description.substring(0, 100)}${story.description.length > 100 ? '...' : ''}`
            : 'No description available';

        const marker = L.marker([story.lat, story.lon], {
            title: storyName
        }).addTo(map);
        
        marker.bindPopup(`
            <div class="map-popup">
                <h3>${storyName}</h3>
                <p>${description}</p>
                ${story.id ? `<a href="#/detail/${story.id}" class="btn btn-detail">View Detail</a>` : ''}
            </div>
        `);
    });

    if (validStories.length > 0) {
        const bounds = L.latLngBounds(validStories.map(s => [s.lat, s.lon]));
        map.fitBounds(bounds, { 
            padding: [50, 50],
            maxZoom: 15
        });
    }
}

export function cleanupMaps() {
    Object.entries(mapInstances).forEach(([id, map]) => {
        try {
            map.remove();
            delete mapInstances[id];
        } catch (error) {
            console.error(`Failed to cleanup map ${id}:`, error);
        }
    });
}

export default {
    initMap,
    getCurrentLocation,
    showStoryOnMap,
    showStoriesOnMap,
    cleanupMaps
};
=======
let mapInstances = {};

/**
 * Mendapatkan lokasi pengguna saat ini
 * @returns {Promise<GeolocationPosition>}
 * @throws {Error} Jika geolokasi tidak didukung atau gagal
 */
export async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => {
                let errorMessage = 'Error getting your location';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access was denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out';
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    });
}

/**
 * Menginisialisasi peta Leaflet dengan tambahan layer control dan transisi
 * @param {string} elementId - ID elemen container untuk peta
 * @returns {L.Map|null} Instance peta Leaflet atau null jika gagal
 */
export function initMap(elementId) {
    // Hapus instance sebelumnya jika ada
    if (mapInstances[elementId]) {
        mapInstances[elementId].remove();
        delete mapInstances[elementId];
    }

    // Periksa apakah container ada
    const container = document.getElementById(elementId);
    if (!container) {
        console.error(`Map container #${elementId} not found`);
        return null;
    }

    // Pastikan container memiliki dimensi
    container.style.height = container.style.height || '400px';
    container.style.width = container.style.width || '100%';

    // Buat peta baru dengan transisi animasi dan pengaturan zoom yang lebih halus
    const map = L.map(elementId, {
        zoomControl: true,
        dragging: true,
        tap: false, // Untuk menghindari masalah di mobile
        fadeAnimation: true // Transisi animasi ketika berpindah antar layer
    }).setView([-6.1754, 106.8272], 10); // Default ke Jakarta

    // Menambahkan beberapa tile layer
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 2
    });

    const satelliteLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 2
    });

    // Tambahkan kontrol layer
    const baseMaps = {
        "OpenStreetMap": osmLayer,
        "Satellite": satelliteLayer
    };

    L.control.layers(baseMaps).addTo(map);

    // Gunakan OpenStreetMap sebagai default
    osmLayer.addTo(map);

    // Simpan instance
    mapInstances[elementId] = map;
    return map;
}

/**
 * Menampilkan story di peta
 * @param {L.Map} map - Instance peta Leaflet
 * @param {Object} story - Data story
 * @param {number} story.lat - Latitude
 * @param {number} story.lon - Longitude
 * @param {string} [story.name] - Nama story
 * @param {string} [story.description] - Deskripsi story
 */
export function showStoryOnMap(map, story) {
    if (!map || !map.setView || !story?.lat || !story?.lon) {
        console.error('Invalid map or story data');
        return;
    }

    const lat = Number(story.lat);
    const lon = Number(story.lon);
    
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        console.error('Invalid coordinates:', story.lat, story.lon);
        return;
    }

    map.setView([lat, lon], 13);

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    const storyName = story.name || 'Unknown Story';
    const description = story.description 
        ? `${story.description.substring(0, 100)}${story.description.length > 100 ? '...' : ''}`
        : 'No description available';

    const marker = L.marker([lat, lon], {
        title: storyName,
        alt: `Story location: ${storyName}`
    }).addTo(map);
    
    marker.bindPopup(`
        <div class="map-popup">
            <h3>${storyName}</h3>
            <p>${description}</p>
        </div>
    `).openPopup();
}

/**
 * Menampilkan multiple stories di peta
 * @param {L.Map} map - Instance peta Leaflet
 * @param {Array} stories - Array of story objects
 */
export function showStoriesOnMap(map, stories) {
    if (!map || !Array.isArray(stories)) return;

    const validStories = stories.filter(story => {
        const lat = Number(story?.lat);
        const lon = Number(story?.lon);
        return !isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
    });

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    validStories.forEach(story => {
        const storyName = story.name || 'Untitled Story';
        const description = story.description 
            ? `${story.description.substring(0, 100)}${story.description.length > 100 ? '...' : ''}`
            : 'No description available';

        const marker = L.marker([story.lat, story.lon], {
            title: storyName
        }).addTo(map);
        
        marker.bindPopup(`
            <div class="map-popup">
                <h3>${storyName}</h3>
                <p>${description}</p>
                ${story.id ? `<a href="#/detail/${story.id}" class="btn btn-detail">View Detail</a>` : ''}
            </div>
        `);
    });

    if (validStories.length > 0) {
        const bounds = L.latLngBounds(validStories.map(s => [s.lat, s.lon]));
        map.fitBounds(bounds, { 
            padding: [50, 50],
            maxZoom: 15
        });
    }
}

export function cleanupMaps() {
    Object.entries(mapInstances).forEach(([id, map]) => {
        try {
            map.remove();
            delete mapInstances[id];
        } catch (error) {
            console.error(`Failed to cleanup map ${id}:`, error);
        }
    });
}

export default {
    initMap,
    getCurrentLocation,
    showStoryOnMap,
    showStoriesOnMap,
    cleanupMaps
};
>>>>>>> 03606de99c3eb3b222071ef32a676d77374bf572
