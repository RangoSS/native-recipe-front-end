import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3003/api', // Replace with your API base URL
  timeout: 10000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
