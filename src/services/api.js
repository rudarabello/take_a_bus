import Axios from 'axios';

export const api = Axios.create({
  baseURL: 'https://transit.hereapi.com/v8/',
});
