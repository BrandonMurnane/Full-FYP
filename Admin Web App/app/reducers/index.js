import { combineReducers } from 'redux';

import requestsReducer from '../highOrderComponents/requests/reducer';
import formReducer from '../highOrderComponents/form/reducer';
import { createModalReducer } from './ModalReducer.js';

import { SELECT_ROW_TO_SHOW_DETAILS, RESET_ROW } from '../actions/TableActions';

function selectedTableRow(state=[], action) {
  switch (action.type) {
    case SELECT_ROW_TO_SHOW_DETAILS:{
      const index = state.findIndex((row) => row === action.selectedRowId);

      // remove if row is already selected
      if (index !== -1){
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return [...state, action.selectedRowId];
    }
    case RESET_ROW: {
      return [];
    }
    default:
      return state;
  }
}


const modal = (state={ name: null, isOpen: false, key: null }, action) => {
  switch (action.type) {
    case '@@modal/CREATE_MODAL': {
      return {
        ...state,
        isOpen: false,
        key: null
      };
    }
    case '@@modal/OPEN_MODAL': {
      return {
        ...state,
        isOpen: true,
        key: action.key
      };
    }
    case '@@modal/CLOSE_MODAL': {
      return {
        ...state,
        isOpen: false,
        key: null
      };
    }
    default: {
      return state;
    }
  }
}


const rootReducer = combineReducers({
  newBooth: combineReducers({
    // form: createFormReducer('newBooth'),
    modal: createModalReducer('newBooth')
  }),
  editBooth: combineReducers({
    // form: createFormReducer('editBooth'),
    modal: createModalReducer('editBooth'),
    verifyDelete: createModalReducer('verifyDelete')
  }),
  newEvent: combineReducers({
    // form: createFormReducer('newEvent'),
    modal: createModalReducer('newEvent')
  }),
  editEvent: combineReducers({
    // form: createFormReducer('editEvent'),
    modal: createModalReducer('editEvent'),
    verifyDelete: createModalReducer('verifyDelete')
  }),
  newCategory: combineReducers({
    // form: createFormReducer('newEvent'),
    modal: createModalReducer('newCategory')
  }),
  editCategory: combineReducers({
    // form: createFormReducer('editEvent'),
    modal: createModalReducer('editCategory'),
    verifyDelete: createModalReducer('verifyDelete')
  }),
  newUserGroup: combineReducers({
    // form: createFormReducer('newEvent'),
    modal: createModalReducer('newUserGroup')
  }),
  editUserGroup: combineReducers({
    // form: createFormReducer('editEvent'),
    modal: createModalReducer('editUserGroup'),
    verifyDelete: createModalReducer('verifyDelete')
  }),
  selectedTableRow,
  forms: formReducer(),
  requests: requestsReducer
});

export default rootReducer;
