import {combineReducers} from '@reduxjs/toolkit';
import configReducer from 'redux/ConfigReducer';
import authReducer from 'redux/AuthReducer';

export const allReducers = combineReducers({
  config: configReducer,
  auth: authReducer,
});
