import { takeLatest, call, put } from 'redux-saga/effects';
import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
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

export default function* watcher() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
}
