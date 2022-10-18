/* eslint-disable no-undef */
import axios from 'axios';

// export const getTwitterData = axios.create({
//   baseURL: 'http://localhost:3000/realtime-point-data',
//   // params: {
//   //   long,
//   //   lat,
//   // }
// });


export const getTwitterData = (long, lat, radius, hours) =>
  axios({
    method: 'get',
    url: 'http://localhost:3000/realtime-point-data',
    params: {
      long,
      lat,
      radius,
      hours,
    },
  });

export const getWordCloudData = (location) =>
  axios({
    method: 'get',
    url: 'http://localhost:3000/word-cloud-data',
    params: {
      location,
    },
  });