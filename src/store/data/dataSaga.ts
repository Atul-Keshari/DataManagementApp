
import {takeLatest, call, put} from 'redux-saga/effects';
import {fetchDataStart, fetchDataSuccess, fetchDataFailure} from './dataSlice';
import axios from 'axios';
import { ApiConstants } from '../../constants/ApiConstants';

function* fetchData(action:any) {
  try {
    console.log(action.payload.token);
    const response = yield call(fetchDataFromApi, action.payload.token);
    const data=JSON.stringify(response.data.data)
    yield put(fetchDataSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(fetchDataFailure(error.message));
  }
}

async function fetchDataFromApi(token:string) {
  try{
    const response=await axios.get(`${ApiConstants.BASE_URL}/data`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response
  }catch(error){
    console.log(error);
    return error
  }
}

export function* watchFetchData() {
  yield takeLatest('data/fetchData', fetchData);
}
