import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from '../actions/users';
import Account from "../../helpers/Account";

const initialState = {
  user: Account.getAccount(),
  token: Account.getToken(),
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case SIGN_IN_SUCCESS: {
      const { user, token } = action.payload.data;
      Account.setAccount(user);
      Account.setToken(token);
      return {
        ...state,
        token,
        user,
      };
    }
    case SIGN_IN_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
      };
    }
    case SIGN_UP_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case UPLOAD_IMAGE_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
      };
    }
    case UPLOAD_IMAGE_FAIL: {
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
