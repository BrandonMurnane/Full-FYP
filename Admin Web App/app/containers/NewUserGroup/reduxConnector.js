'use strict';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as modalActions from '../../actions/ModalActions';

function mapStateToProps(state) {

  const props = {
    modal: {
      isOpen: state.newUserGroup.modal.isOpen
    }
  };
  return props;
}

function mapDispatchToProps(dispatch, props) {
  const { form, requests: { postUserGroup } } = props;
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
        dispatch(modalActions.handleOpen('newUserGroup'));
      } else {
        form.showErrors();
      }
    },
    closeModal: () => {
      dispatch(modalActions.handleClose('newUserGroup'));
      postUserGroup.handleReset();
    },
    submitUserGroup: () => {
      postUserGroup.handleRequest(form.data);
    },
    reset: () => {
      postUserGroup.handleReset();
      dispatch(modalActions.handleClose('newUserGroup'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
