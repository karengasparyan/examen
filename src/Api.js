import axios from 'axios';
import {serialize} from 'object-to-formdata';
import Account from './helpers/Account';

const REACT_APP_API_URL = 'http://localhost:4000';
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
    window.location.href = '/';
  }
  return Promise.reject(e);
});

class Api {

  static signIn(email, password) {
    return api.post('/users/sign-in', { email, password });
  }

  static signUp(file, requestData) {
    return api.post('/users/sign-up',serialize({file, ...requestData}));
  }

  static addEvent(file, requestData) {
    return api.post('/events/create',serialize({file, ...requestData}));
  }

  static updateEvent(file, requestData) {
    return api.post('/events/update',serialize({file, ...requestData}));
  }

  static deleteEvent(userId, eventId) {
    return api.post('/events/delete',{userId, eventId});
  }

  static allMyEvent(userId, query, page) {
    return api.post('/events/all-my',{userId, query, page});
  }

  static allEvent(userId, query, page) {
    return api.post('/events/all',{userId, query, page});
  }

  static singleEvent(eventId) {
    return api.post('/events/single-event',{eventId});
  }

  static pendingEvent(userId, eventId) {
    return api.post('/events/pending-event',{userId, eventId});
  }

  static successEvent(userId, eventId) {
    return api.post('/events/success-event',{userId, eventId});
  }

  static deleteRequestEvent(userId, eventId, deleteType) {
    return api.post('/events/delete-request-event',{userId, eventId, deleteType});
  }

  static getSuccessEvent(userId) {
    return api.post('/events/get-success-events',{userId});
  }

  static getPendingEvent(userId) {
    return api.post('/events/get-pending-events',{userId});
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
    return api.post('/users/upload-image', serialize({file, userId}));
  }

}

export default Api;
