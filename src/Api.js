import axios from 'axios';
import {serialize} from 'object-to-formdata';
import Account from './helpers/Account';

const {REACT_APP_API_URL} = process.env;
const api = axios.create({
  baseURL: 'http://localhost:4000',
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
    window.location.href = '/';
  }
  return Promise.reject(e);
});

class Api {

  static signIn(email, password) {
    return api.post('http://localhost:4000/users/sign-in', { email, password });
  }

  static signUp(requestData) {
    return api.post('http://localhost:4000/users/sign-up',{...requestData});
  }

  // static uploadImage(file, userId) {
  //   let formData = new FormData();
  //
  //   file.map((files)=>{
  //     return formData.append('file', files)
  //   });
  //   formData.append('userId',userId);
  //
  //   return api.post('http://localhost:4000/users/upload-image',formData, {headers: { 'Content-Type': 'multipart/form-data' }});
  // }

  static uploadImage(file, userId) {
    const formData = new FormData();

    formData.append('File', file.FileList);
    formData.append('userId', userId);
    return api.post('http://localhost:4000/users/upload-image', formData );
  }

}

export default Api;
