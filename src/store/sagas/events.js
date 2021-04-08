import { takeLatest, call, put } from 'redux-saga/effects';
import Api from '../../Api';
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

function* addEvent(action) {
  try {
    const { file, requestData } = action.payload;
    const { data } = yield call(Api.addEvent, file, requestData);
    yield put({
      type: ADD_EVENT_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: ADD_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* updateEvent(action) {
  try {
    const { file, requestData } = action.payload;
    const { data } = yield call(Api.updateEvent, file, requestData);
    yield put({
      type: UPDATE_EVENT_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: UPDATE_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* deleteEvent(action) {
  try {
    const { userId, eventId } = action.payload;
    const { data } = yield call(Api.deleteEvent, userId, eventId);
    yield put({
      type: DELETE_EVENT_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: DELETE_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* allMyEvent(action) {
  try {
    const { userId, query, page } = action.payload;
    const { data } = yield call(Api.allMyEvent, userId, query, page);
    yield put({
      type: ALL_MY_EVENT_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: ALL_MY_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* allEvent(action) {
  try {
    const {userId, query, page } = action.payload;
    const { data } = yield call(Api.allEvent,userId, query, page);
    yield put({
      type: ALL_EVENT_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: ALL_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* singleEvent(action) {
  try {
    const { eventId } = action.payload;
    const { data } = yield call(Api.singleEvent, eventId);
    yield put({
      type: SINGLE_EVENT_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: SINGLE_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* pendingEvent(action) {
  try {
    const { userId, eventId } = action.payload;
    const { data } = yield call(Api.pendingEvent, userId, eventId);
    yield put({
      type: PENDING_EVENT_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: PENDING_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* successEvent(action) {
  try {
    const { userId, eventId } = action.payload;
    const { data } = yield call(Api.successEvent, userId, eventId);
    yield put({
      type: SUCCESS_EVENT_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: SUCCESS_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* deleteRequestEvent(action) {
  try {
    const { userId, eventId, deleteType } = action.payload;
    const { data } = yield call(Api.deleteRequestEvent, userId, eventId, deleteType);
    yield put({
      type: DELETE_REQUEST_EVENT_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: DELETE_REQUEST_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* getPendingEvent(action) {
  try {
    const { userId } = action.payload;
    const { data } = yield call(Api.getPendingEvent, userId);
    yield put({
      type: GET_PENDING_EVENT_SUCCESS,
      payload: { data },
    });

  } catch (e) {
    yield put({
      type: GET_PENDING_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getSuccessEvent(action) {
  try {
    const { userId } = action.payload;
    const { data } = yield call(Api.getSuccessEvent, userId);
    yield put({
      type: GET_SUCCESS_EVENT_SUCCESS,
      payload: { data },
    });

  } catch (e) {
    yield put({
      type: GET_SUCCESS_EVENT_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

export default function* watcher() {
  yield takeLatest(ADD_EVENT_REQUEST, addEvent);
  yield takeLatest(UPDATE_EVENT_REQUEST, updateEvent);
  yield takeLatest(DELETE_EVENT_REQUEST, deleteEvent);
  yield takeLatest(ALL_MY_EVENT_REQUEST, allMyEvent);
  yield takeLatest(ALL_EVENT_REQUEST, allEvent);
  yield takeLatest(SINGLE_EVENT_REQUEST, singleEvent);
  yield takeLatest(PENDING_EVENT_REQUEST, pendingEvent);
  yield takeLatest(SUCCESS_EVENT_REQUEST, successEvent);
  yield takeLatest(DELETE_REQUEST_EVENT_REQUEST, deleteRequestEvent);
  yield takeLatest(GET_SUCCESS_EVENT_REQUEST, getSuccessEvent);
  yield takeLatest(GET_PENDING_EVENT_REQUEST, getPendingEvent);
}
