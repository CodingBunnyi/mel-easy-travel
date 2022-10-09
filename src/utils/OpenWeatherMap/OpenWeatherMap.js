import axios from 'axios';

const baseURL = 'https://api.openweathermap.org/data/2.5';
const units = 'metric';
const appid = 'c0167be7a6c2cff178697b61e8b2e2cd';
const id = '2158177';

const OpenWeatherMap = axios.create({
    baseURL,
    params: {
      units,
      appid,
      id,
    }
  });

export default OpenWeatherMap;
