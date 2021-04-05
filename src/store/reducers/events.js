import {ADD_EVENT_FAIL, ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS} from "../actions/events";

const initialState = {
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case ADD_EVENT_SUCCESS: {
      return {
        ...state,
      };
    }
    case ADD_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    default: {
      return state;
    }
  }
}
