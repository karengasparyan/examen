import { takeLatest, call, put } from 'redux-saga/effects';
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
import Api from '../../Api';

function* signIn(action) {
  try {
    const { email, password } = action.payload;
    const { data } = yield call(Api.signIn, email, password);
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: SIGN_IN_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* signUp(action) {
  try {
    const { file, requestData } = action.payload;
    const { data } = yield call(Api.signUp, file, requestData);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* uploadImage(action) {
  try {
    const { files, userId } = action.payload;
    const { data } = yield call(Api.uploadImage, files, userId);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGE_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

export default function* watcher() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
  yield takeLatest(SIGN_UP_REQUEST, signUp);
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}
