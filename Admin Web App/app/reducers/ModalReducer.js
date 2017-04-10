import { OPEN_MODAL, CLOSE_MODAL } from '../actions/ModalActions'

export function createModalReducer(name) {
  return function(state={isOpen: false}, action) {
    if(name !== action.name) return state; //exit early if action not targeted to this reducer

    switch(action.type) {
      case OPEN_MODAL:
        return {...state, isOpen: true, key: action.key };
      case CLOSE_MODAL:
        return {...state, isOpen: false, key: null };
      default:
        return state;
    }
  }
}
