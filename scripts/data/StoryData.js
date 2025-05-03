import AuthService from '../services/AuthService.js';

const API_BASE_URL = 'https://story-api.dicoding.dev/v1';

class StoryData {
  static async getAllStories({ page = 1, size = 10, location = 1 } = {}){
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Authentication required');
      console.log('Token:', token);

      const response = await fetch(
        `${API_BASE_URL}/stories?page=${page}&size=${size}&location=${location}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
  }

  static async addStory({ description, photo, lat, lon }) {
    try {
      const token = AuthService.getToken();
      const formData = new FormData();
      
      formData.append('description', description);
      formData.append('photo', photo);
      if (lat) formData.append('lat', lat);
      if (lon) formData.append('lon', lon);
      
      const response = await fetch(`${API_BASE_URL}/stories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to add story');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding story:', error);
      throw error;
    }
  }

  static async addStoryAsGuest({ description, photo, lat, lon }) {
    try {
      const formData = new FormData();
      
      formData.append('description', description);
      formData.append('photo', photo);
      if (lat) formData.append('lat', lat);
      if (lon) formData.append('lon', lon);
      
      const response = await fetch(`${API_BASE_URL}/stories/guest`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to add story as guest');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding guest story:', error);
      throw error;
    }
  }

  static async getStoryById(id) {
    try {
      const token = AuthService.getToken();
      if (!token) throw new Error('Authentication required');

      const response = await fetch(`${API_BASE_URL}/stories/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch story details');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching story details:', error);
      throw error;
    }
  }
}
export default StoryData;