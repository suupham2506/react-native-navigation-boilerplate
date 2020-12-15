import {combineReducers} from '@reduxjs/toolkit';
import configReducer from 'redux/ConfigReducer';

export const allReducers = combineReducers({
  config: configReducer,
});
