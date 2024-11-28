import axios from 'axios';

const API_KEY = 'ae8adcd0d439ff8c43540c5836669c05'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};