import Axios from 'axios';

export default Axios.create({
  baseURL: 'https://transit.hereapi.com/v8/',
});
