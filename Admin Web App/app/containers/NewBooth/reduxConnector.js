'use strict';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as modalActions from '../../actions/ModalActions';

function mapStateToProps(state) {

  const props = {
    modal: {
      isOpen: state.newBooth.modal.isOpen
    }
  };
  return props;
}

function mapDispatchToProps(dispatch, props) {
  const { form, requests: { postBooth } } = props;
  return {
    openModal: () => {
      if (_.isEmpty(form.errors)) {
        dispatch(modalActions.handleOpen('newBooth'));
      } else {
        form.showErrors();
      }
    },
    closeModal: () => {
      dispatch(modalActions.handleClose('newBooth'));
      postBooth.handleReset();
    },
    submitBooth: () => {
      postBooth.handleRequest(form.data);
    },
    reset: () => {
      postBooth.handleReset();
      dispatch(modalActions.handleClose('newBooth'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
