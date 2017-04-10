'use strict';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as modalActions from '../../actions/ModalActions';

function mapStateToProps(state) {
  const props = {
    modal: {
      isOpen: state.newCategory.modal.isOpen
    }
  };
  return props;
}

function mapDispatchToProps(dispatch, props) {
  const { form, requests: { postCategory } } = props;
  return {
    nextPage: () => {
      if (_.isEmpty(form.errors)) {
        form.fields.page.onChange(form.fields.page.value + 1);
        form.hideErrors();
      } else {
        form.showErrors();
      }
    },
    previousPage: () => {
      form.fields.page.onChange(form.fields.page.value - 1);
    },
    openModal: () => {
      if (_.isEmpty(form.errors)) {
        dispatch(modalActions.handleOpen('newCategory'));
      } else {
        form.showErrors();
      }
    },
    closeModal: () => {
      dispatch(modalActions.handleClose('newCategory'));
      postCategory.handleReset();
    },
    submitCategory: () => {
      postCategory.handleRequest(form.data);
    },
    reset: () => {
      postCategory.handleReset();
      dispatch(modalActions.handleClose('newCategory'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
