export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAIL = 'ADD_EVENT_FAIL';

export function addEventRequest(file, requestData, cb) {
  return {
    type: ADD_EVENT_REQUEST,
    payload: { file, requestData, cb },
  };
}

export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAIL = 'UPDATE_EVENT_FAIL';

export function updateEventRequest(file, requestData, cb) {
  return {
    type: UPDATE_EVENT_REQUEST,
    payload: { file, requestData, cb },
  };
}

export const ALL_MY_EVENT_REQUEST = 'ALL_MY_EVENT_REQUEST';
export const ALL_MY_EVENT_SUCCESS = 'ALL_MY_EVENT_SUCCESS';
export const ALL_MY_EVENT_FAIL = 'ALL_MY_EVENT_FAIL';

export function allMyEventRequest(userId, query, page) {
  return {
    type: ALL_MY_EVENT_REQUEST,
    payload: { userId, query, page },
  };
}

export const ALL_EVENT_REQUEST = 'ALL_EVENT_REQUEST';
export const ALL_EVENT_SUCCESS = 'ALL_EVENT_SUCCESS';
export const ALL_EVENT_FAIL = 'ALL_EVENT_FAIL';

export function allEventRequest(userId, query, page) {
  return {
    type: ALL_EVENT_REQUEST,
    payload: {userId, query, page },
  };
}

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAIL = 'DELETE_EVENT_FAIL';

export function deleteEventRequest(userId, eventId, cb) {
  return {
    type: DELETE_EVENT_REQUEST,
    payload: { userId, eventId, cb },
  };
}

export const SINGLE_EVENT_REQUEST = 'SINGLE_EVENT_REQUEST';
export const SINGLE_EVENT_SUCCESS = 'SINGLE_EVENT_SUCCESS';
export const SINGLE_EVENT_FAIL = 'SINGLE_EVENT_FAIL';

export function singleEventRequest(eventId, cb) {
  return {
    type: SINGLE_EVENT_REQUEST,
    payload: { eventId, cb },
  };
}

export const PENDING_EVENT_REQUEST = 'PENDING_EVENT_REQUEST';
export const PENDING_EVENT_SUCCESS = 'PENDING_EVENT_SUCCESS';
export const PENDING_EVENT_FAIL = 'PENDING_EVENT_FAIL';

export function pendingEventRequest(userId, eventId) {
  return {
    type: PENDING_EVENT_REQUEST,
    payload: { userId, eventId },
  };
}

export const GET_PENDING_EVENT_REQUEST = 'GET_PENDING_EVENT_REQUEST';
export const GET_PENDING_EVENT_SUCCESS = 'GET_PENDING_EVENT_SUCCESS';
export const GET_PENDING_EVENT_FAIL = 'GET_PENDING_EVENT_FAIL';

export function getPendingEventRequest(userId) {
  return {
    type: GET_PENDING_EVENT_REQUEST,
    payload: { userId },
  };
}