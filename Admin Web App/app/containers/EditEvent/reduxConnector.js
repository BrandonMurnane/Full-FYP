'use strict';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as modalActions from '../../actions/ModalActions';

function mapStateToProps(state) {
  return {
    modal: {
      isOpen: state.editEvent.modal.isOpen
    },
    verifyDelete: {
      isOpen: state.editEvent.verifyDelete.isOpen
    }
  };
}

function mapDispatchToProps(dispatch, props) {
  const { form, requests: { patchEvent, deleteEvent } } = props;

  return {
    openModal: () => {
      if (_.isEmpty(form.errors)) {
        dispatch(modalActions.handleOpen('editEvent'));
      } else {
        form.showErrors();
      }
    },
    openVerifyDelete: () => {
      dispatch(modalActions.handleOpen('verifyDelete'));
    },
    closeModal: () => {
      dispatch(modalActions.handleClose('editEvent'));
      patchEvent.handleReset();
    },
    closeVerifyDelete: () => {
      dispatch(modalActions.handleClose('verifyDelete'));
    },
    submitEvent: () => {
      patchEvent.handleRequest(form.data);
    },
    reset: () => {
      patchEvent.handleReset();
      dispatch(modalActions.handleClose('editEvent'));
    },
    eventDelete: () => {
      const id = form.data.id;
      deleteEvent.handleRequest(id);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
