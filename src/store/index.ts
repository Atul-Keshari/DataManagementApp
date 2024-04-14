

import {
  configureStore,
  applyMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import signupReducer from './signup/signupSlice';
import signinReducer from './signin/signinSlice';
import formReducer from './submitForm/submitFormSlice'
import dataReducer from './data/dataSlice'
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    form: formReducer,
    data: dataReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
