import axios from 'axios';

export const getTwitterData = axios.create({
  baseURL: 'http://localhost:3000/data',
  params: {
    hello:'1',
    world:'2'
  }
});