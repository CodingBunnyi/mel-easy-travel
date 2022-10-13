import axios from 'axios';

const units = 'metric';
const appid = 'c0167be7a6c2cff178697b61e8b2e2cd';
const lat = -37.814;
const lon = 144.9633;

export const getOneCallWeatherData = axios.create({
  baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
  params: {
    lat,
    lon,
    units,
    appid,
  }
});

// export const getWeatherMapData = axios.create({
//   baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
//   params: {
//     x: lat,
//     y: lon,
//     layer: 'clouds_new',
//     appid,
//   }
// });

