import axios from 'axios';
import queryString from 'query-string';
import config from '../config.json';
import { authenticationService } from '../_services/authentication.service';


const getToken = () => {
  const token = authenticationService.currentUserValue?.token;
  return token;
}

const axiosClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'content-type': 'application/json',
  },
  // paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(config => {
  const token = getToken();
  // console.log("token: ", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;