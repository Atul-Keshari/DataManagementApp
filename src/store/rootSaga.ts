
import {all} from 'redux-saga/effects';
import {watchSignup} from './signup/signupSaga'; 
import {watchSignin} from './signin/signinSaga'; 
import {formSaga} from './submitForm/submitFormSaga';
import {watchFetchData} from './data/dataSaga';
export default function* rootSaga() {
  yield all([watchSignup(), watchSignin(), formSaga(), watchFetchData()]);
}
