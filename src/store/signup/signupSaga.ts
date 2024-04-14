
import {takeLatest, call, put} from 'redux-saga/effects';
import {ApiService} from '../../services/ApiService';
import {signupRequested, signupSuccess, signupFailure} from './signupSlice';

function* handleSignup(action: ReturnType<typeof signupRequested>) {
  try {
    const {email, name, password} = action.payload;
    const userData = yield call(ApiService.signup, email, name, password);
    console.log(userData);
    yield put(signupSuccess(userData));
    
  } catch (error) {
    yield put(signupFailure(error.message));
  }
}

export function* watchSignup() {
  yield takeLatest(signupRequested.type, handleSignup);
}
