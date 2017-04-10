'use strict';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as modalActions from '../../actions/ModalActions';

function mapStateToProps(state) {
  const props = {
    modal: {
      isOpen: state.newEvent.modal.isOpen
    }
  };
  return props;
}

function mapDispatchToProps(dispatch, props) {
  const { form, requests: { postEvent } } = props;
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
        dispatch(modalActions.handleOpen('newEvent'));
      } else {
        form.showErrors();
      }
    },
    closeModal: () => {
      dispatch(modalActions.handleClose('newEvent'));
      postEvent.handleReset();
    },
    submitEvent: () => {
      postEvent.handleRequest(form.data);
    },
    reset: () => {
      postEvent.handleReset();
      dispatch(modalActions.handleClose('newEvent'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
