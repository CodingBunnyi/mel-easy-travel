import axios from 'axios';

const units = 'metric';
const appid = 'c0167be7a6c2cff178697b61e8b2e2cd';

export const getOneCallWeatherData = axios.create({
  baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
  params: {
    lat:-37.814,
    lon:144.9633,
    units,
    appid,
  }
});

