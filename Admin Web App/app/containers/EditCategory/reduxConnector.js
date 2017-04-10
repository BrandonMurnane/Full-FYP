'use strict';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as modalActions from '../../actions/ModalActions';

function mapStateToProps(state) {
  return {
    modal: {
      isOpen: state.editCategory.modal.isOpen
    },
    verifyDelete: {
      isOpen: state.editCategory.verifyDelete.isOpen
    }
  };
}

function mapDispatchToProps(dispatch, props) {
  const { form, requests: { patchCategory, deleteCategory } } = props;

  return {
    openModal: () => {
      if (_.isEmpty(form.errors)) {
        dispatch(modalActions.handleOpen('editCategory'));
      } else {
        form.showErrors();
      }
    },
    openVerifyDelete: () => {
      dispatch(modalActions.handleOpen('verifyDelete'));
    },
    closeModal: () => {
      dispatch(modalActions.handleClose('editCategory'));
      patchCategory.handleReset();
    },
    closeVerifyDelete: () => {
      dispatch(modalActions.handleClose('verifyDelete'));
    },
    submitCategory: () => {
      patchCategory.handleRequest(form.data);
    },
    reset: () => {
      patchCategory.handleReset();
      dispatch(modalActions.handleClose('editCategory'));
    },
    categoryDelete: () => {
      const id = form.data.id;
      deleteCategory.handleRequest(id);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
