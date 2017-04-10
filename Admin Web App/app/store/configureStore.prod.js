import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger();

//wrap store store creation function
const finalCreateStore = compose(
  //apply middleware to store
  //middleware intercepts calls to dispatch() and adds speciality output
  applyMiddleware(thunk, logger),
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}