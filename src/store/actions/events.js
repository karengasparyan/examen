export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAIL = 'ADD_EVENT_FAIL';

export function addEventRequest(file, requestData, cb) {
  return {
    type: ADD_EVENT_REQUEST,
    payload: { file, requestData, cb },
  };
}
