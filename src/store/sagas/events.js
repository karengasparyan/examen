import { takeLatest, call, put } from 'redux-saga/effects';
import Api from '../../Api';
import {ADD_EVENT_FAIL, ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS} from "../actions/events";

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

export default function* watcher() {
  yield takeLatest(ADD_EVENT_REQUEST, addEvent);
}
