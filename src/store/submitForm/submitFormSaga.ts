
import {takeLatest, put, call} from 'redux-saga/effects';
import {
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
} from './submitFormSlice';
import { ApiService } from '../../services/ApiService';


function* submitForm(action:any) {
  try {
    yield put(submitFormStart());
    const {latitude, longitude, file,token} = action.payload;
    console.log(latitude,longitude,file,token);
    const response = yield call(ApiService.submitForm, latitude,longitude,file,token);
    console.log("res",response);
    if (response.success) {
      yield put(submitFormSuccess(response.message));
    } else {
      yield put(submitFormFailure(response.message));
    }
  } catch (error) {
    yield put(
      submitFormFailure('An error occurred while submitting the form.'),
    );
  }
}

export function* formSaga() {
  yield takeLatest('form/submitForm', submitForm);
}
