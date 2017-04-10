import _ from 'lodash';
import { INITIALIZATION, REQUEST, RESPONSE, ERROR, RESET } from './actions';

const initialState = {
  method: 'GET',
  url: null,
  value: null,
  error: null,
  isRequested: false,
  isCompleted: false,
  isErrored: false,
  isPending: false,
  isRefreshing: false,
};


function requestReducer(state=initialState, action) {
  switch (action.type) {
    case INITIALIZATION:
    case RESET: {
      // combines any existing state and params from initialization action
      const newState = {
        ...state,
        ...action,
        isRequested: false,
        isPending: false,
        isCompleted: false,
        isErrored: false,
        isRefreshing: false
      };
      return newState;
    }
    case REQUEST: {
      const refreshing = (state.url === action.url && state.value !== null);

      return {
        ...state,
        method: action.method,
        url: action.url,
        error: null,
        isRequested: true,
        isPending: true,
        isCompleted: false,
        isErrored: false,
        isRefreshing: refreshing
      };
    }
    case RESPONSE: {
      return {
        ...state,
        requesting: false,
        value: action.value,
        isPending: false,
        isCompleted: true,
        isErrored: false,
        isRefreshing: false
      };
    }
    case ERROR: {
      return {
        ...state,
        requesting: false,
        value: null,
        error: action.error,
        isPending: false,
        isCompleted: false,
        isErrored: true,
        isRefreshing: false
      };
    }
    default:
      return state;
  }
}

export default function requestsReducer(state={}, action) {
  if (!_.startsWith(action.type, '@@request')) return state;

  switch (action.type) {
    case INITIALIZATION:
      return {
        ...state,
        [action.key]: requestReducer(state[action.key], action)
      };
    case REQUEST:
    case RESPONSE:
    case ERROR:
    case RESET:
      return { ...state, [action.key]: requestReducer(state[action.key], action) };
    default:
      return state;
  }
}
