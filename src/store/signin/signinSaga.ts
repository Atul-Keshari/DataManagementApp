import {takeLatest, call, put} from 'redux-saga/effects';
import {ApiService} from '../../services/ApiService';
import {signinRequested, signinSuccess, signinFailure} from './signinSlice';

function* handleSignin(action: ReturnType<typeof signinRequested>) {
  try {
    const {email, password} = action.payload;
    const userData = yield call(ApiService.signin, email, password);
    console.log(userData);
    yield put(signinSuccess(userData));
  } catch (error) {
    yield put(signinFailure(error.message));
  }
}

export function* watchSignin() {
  yield takeLatest(signinRequested.type, handleSignin);
}
