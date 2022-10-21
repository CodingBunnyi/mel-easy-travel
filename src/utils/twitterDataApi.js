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

export const getWiKiPediaData = (titles) => 
  axios({
    method: 'get',
    url: 'https://en.wikipedia.org/w/api.php',
    params: {
      format: 'json',
      action: 'query',
      prop: 'extracts',
      explaintext: 1,
      redirects: 1,
      titles,
      origin: '*',
    },
  })