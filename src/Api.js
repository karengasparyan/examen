import axios from 'axios';
import {serialize} from 'object-to-formdata';
import Account from './helpers/Account';

const {REACT_APP_API_URL} = process.env;
const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    config.headers.authorization = Account.getToken();
  }
  return config;
}, (e) => Promise.reject(e));

api.interceptors.response.use((r) => r, (e) => {
  if (e.response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/admin/sign-in';
  }
  return Promise.reject(e);
});

class Api {

  static signIn(email, password) {
    return api.post('/users/sign-in', { email, password });
  }

}

export default Api;
