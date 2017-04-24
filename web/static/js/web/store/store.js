import { createStore, applyMiddleware } from 'redux';
import appReducer from '../reducers/reducer';
import initialState from "./initialState";

const store = createStore(appReducer, initialState)

export default store;
