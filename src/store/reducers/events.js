import {
  ADD_EVENT_FAIL,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ALL_EVENT_FAIL,
  ALL_EVENT_REQUEST,
  ALL_EVENT_SUCCESS,
  ALL_MY_EVENT_FAIL,
  ALL_MY_EVENT_REQUEST,
  ALL_MY_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS, DELETE_REQUEST_EVENT_FAIL, DELETE_REQUEST_EVENT_REQUEST, DELETE_REQUEST_EVENT_SUCCESS,
  GET_PENDING_EVENT_FAIL,
  GET_PENDING_EVENT_REQUEST,
  GET_PENDING_EVENT_SUCCESS,
  GET_SUCCESS_EVENT_FAIL,
  GET_SUCCESS_EVENT_REQUEST,
  GET_SUCCESS_EVENT_SUCCESS,
  PENDING_EVENT_FAIL,
  PENDING_EVENT_REQUEST,
  PENDING_EVENT_SUCCESS,
  SINGLE_EVENT_FAIL,
  SINGLE_EVENT_REQUEST,
  SINGLE_EVENT_SUCCESS,
  SUCCESS_EVENT_FAIL,
  SUCCESS_EVENT_REQUEST,
  SUCCESS_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS
} from "../actions/events";
import Account from "../../helpers/Account";

const initialState = {
  myEvents: [],
  myEventPagesCount: 1,
  allEvents: [],
  allEventPagesCount: 1,
  singleEvent: Account.getEvents(),
  pendingEvents: [],
  successEvents: [],
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
    case UPDATE_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case UPDATE_EVENT_SUCCESS: {
      return {
        ...state,
      };
    }
    case UPDATE_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case ALL_MY_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case ALL_MY_EVENT_SUCCESS: {
      const {myEvents, myEventPagesCount} = action.payload.data;
      return {
        ...state,
        myEvents,
        myEventPagesCount,
      };
    }
    case ALL_MY_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case ALL_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case ALL_EVENT_SUCCESS: {
      const {allEvents, allEventPagesCount} = action.payload.data;
      return {
        ...state,
        allEvents,
        allEventPagesCount,
      };
    }
    case ALL_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case DELETE_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case DELETE_EVENT_SUCCESS: {
      return {
        ...state,
      };
    }
    case DELETE_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case SINGLE_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case SINGLE_EVENT_SUCCESS: {
      const { singleEvent } = action.payload.data;
      Account.setEvents(singleEvent);
      return {
        ...state,
        singleEvent,
      };
    }
    case SINGLE_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case PENDING_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case PENDING_EVENT_SUCCESS: {
      return {
        ...state,
      };
    }
    case PENDING_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case SUCCESS_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case SUCCESS_EVENT_SUCCESS: {
      return {
        ...state,
      };
    }
    case SUCCESS_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case DELETE_REQUEST_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case DELETE_REQUEST_EVENT_SUCCESS: {
      return {
        ...state,
      };
    }
    case DELETE_REQUEST_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case GET_PENDING_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case GET_PENDING_EVENT_SUCCESS: {
      const { pendingEvents } = action.payload.data;
      return {
        ...state,
        pendingEvents,
      };
    }
    case GET_PENDING_EVENT_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case GET_SUCCESS_EVENT_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case GET_SUCCESS_EVENT_SUCCESS: {
      const { successEvents } = action.payload.data;
      return {
        ...state,
        successEvents,
      };
    }
    case GET_SUCCESS_EVENT_FAIL: {
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
