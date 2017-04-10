'use strict';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as modalActions from '../../actions/ModalActions';

function mapStateToProps(state) {
  return {
    modal: {
      isOpen: state.editUserGroup.modal.isOpen
    },
    verifyDelete: {
      isOpen: state.editUserGroup.verifyDelete.isOpen
    }
  };
}

function mapDispatchToProps(dispatch, props) {
  const { form, requests: { patchUserGroup, deleteUserGroup } } = props;

  return {
    openModal: () => {
      if (_.isEmpty(form.errors)) {
        dispatch(modalActions.handleOpen('editUserGroup'));
      } else {
        form.showErrors();
      }
    },
    openVerifyDelete: () => {
      dispatch(modalActions.handleOpen('verifyDelete'));
    },
    closeModal: () => {
      dispatch(modalActions.handleClose('editUserGroup'));
      patchUserGroup.handleReset();
    },
    closeVerifyDelete: () => {
      dispatch(modalActions.handleClose('verifyDelete'));
    },
    submitUserGroup: () => {
      patchUserGroup.handleRequest(form.data);
    },
    reset: () => {
      patchUserGroup.handleReset();
      dispatch(modalActions.handleClose('editUserGroup'));
    },
    userGroupDelete: () => {
      const id = form.data.id;
      deleteUserGroup.handleRequest(id);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
