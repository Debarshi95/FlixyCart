import axios from 'axios';
import { clearItem, getItem } from './helperFuncs';

const generateApiClient = (baseURL = '') => {
  const config = axios.create({
    baseURL,
    headers: {
      'Content-type': 'application/json',
    },
  });

  config.interceptors.request.use(
    (cfg) => {
      const token = getItem('user')?.token;
      if (token) {
        cfg.headers = {
          Authorization: token,
        };
      }
      return cfg;
    },
    (err) => Promise.reject(err)
  );
  config.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err?.response?.data.message === 'jwt expired') {
        clearItem('user');
      }
      return Promise.reject(err);
    }
  );

  return config;
};

export default generateApiClient;
