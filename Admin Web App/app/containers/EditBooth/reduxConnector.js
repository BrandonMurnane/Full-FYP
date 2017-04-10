'use strict';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as modalActions from '../../actions/ModalActions';

function mapStateToProps(state) {
  return {
    modal: {
      isOpen: state.editBooth.modal.isOpen
    },
    verifyDelete: {
      isOpen: state.editBooth.verifyDelete.isOpen
    }
  };
}

function mapDispatchToProps(dispatch, props) {
  const { form, requests: { patchBooth, deleteBooth } } = props;

  return {
    openModal: () => {
      if (_.isEmpty(form.errors)) {
        dispatch(modalActions.handleOpen('editBooth'));
      } else {
        form.showErrors();
      }
    },
    openVerifyDelete: () => {
      dispatch(modalActions.handleOpen('verifyDelete'));
    },
    closeModal: () => {
      dispatch(modalActions.handleClose('editBooth'));
      patchBooth.handleReset();
    },
    closeVerifyDelete: () => {
      dispatch(modalActions.handleClose('verifyDelete'));
    },
    submitBooth: () => {
      patchBooth.handleRequest(form.data);
    },
    reset: () => {
      patchBooth.handleReset();
      dispatch(modalActions.handleClose('editBooth'));
    },
    boothDelete: () => {
      const id = form.data.id;
      deleteBooth.handleRequest(id);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
