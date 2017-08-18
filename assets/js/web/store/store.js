import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import appReducer from '../reducers/reducer';
import initialState from "./initialState";

const logger = createLogger();
const middlewares = [thunk, logger];

const store = createStore(appReducer, initialState, applyMiddleware(...middlewares));

export default store;
