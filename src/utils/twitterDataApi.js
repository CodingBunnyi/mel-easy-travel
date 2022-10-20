import axios from 'axios';

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

export const getWordCloudData = (loc_id) =>
  axios({
    method: 'get',
    url: 'http://localhost:3000/word-cloud-data',
    params: {
      loc_id,
    },
  });

export const getHeatMapData = () =>
  axios({
    method: 'get',
    url: 'http://localhost:3000/heat-map-data',
  });