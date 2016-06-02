import { combineReducers } from 'redux';
import app from './app';
import client from './client';

const reducers = combineReducers({
  app,
  client
});

export default reducers;
