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
  DELETE_EVENT_SUCCESS, SINGLE_EVENT_FAIL,
  SINGLE_EVENT_REQUEST,
  SINGLE_EVENT_SUCCESS, UPDATE_EVENT_FAIL, UPDATE_EVENT_REQUEST, UPDATE_EVENT_SUCCESS
} from "../actions/events";
import Account from "../../helpers/Account";

const initialState = {
  myEvents: [],
  myEventPagesCount: 1,
  allEvents: [],
  allEventPagesCount: 1,
  singleEvent: Account.getEvents(),
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

    default: {
      return state;
    }
  }
}
