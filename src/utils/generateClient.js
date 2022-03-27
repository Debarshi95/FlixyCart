/* eslint-disable no-param-reassign */
import axios from 'axios';

const generateApiClient = (baseURL = '') => {
  const config = axios.create({
    baseURL,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return config;
};

export default generateApiClient;
