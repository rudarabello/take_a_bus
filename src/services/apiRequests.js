import {api} from './api';
import {API_KEY} from '@env';

export const busStopsRequest = async (latitude, longitude) => {
  const KEY = API_KEY;
  return api.get(`stations?apiKey=${KEY}&in=${latitude},${longitude}`);
};
