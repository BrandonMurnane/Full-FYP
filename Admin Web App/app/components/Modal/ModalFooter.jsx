import React, { PropTypes } from 'react';

export default class ModalFooter extends React.Component {

  render() {
    const { closeModal, submitModal } = this.props;

    //If only close handle is passed show a Close Button
    //If close and cancel handlers passed, so Cancel and Submit
    return (
      <div className="slds-modal__footer">
        <div className="slds-x-small-buttons--horizontal">
          <button className="slds-button slds-button--neutral" onClick={closeModal}>{submitModal ? 'Cancel' : 'Close'}</button>
          {submitModal && <button className="slds-button slds-button--neutral slds-button--brand" onClick={submitModal}>Submit</button> }
        </div>
      </div>
    )
  }
}
