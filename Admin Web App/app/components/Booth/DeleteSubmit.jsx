import React from 'react';
import { Link } from 'react-router';
import './PatchSubmit.scss';

export default class DeleteSubmit extends React.Component {
  render() {
    const { sendRequest, isOpen, onClose: handleClose } = this.props;
    if (!isOpen) return null;

    return (
      <div className='success-banner'>
        <div aria-hidden='false' role='dialog' className='slds-modal slds-fade-in-open'>
          <div className='slds-modal__container'>
            <div className='slds-modal__header'>
              <h2 className='slds-text-heading--medium'>Are you sure you want to delete this Booth</h2>
            </div>
            <div className='slds-modal__menu'>
            <span>
              <span className='button1'>
                  <button
                    type='button'
                    onClick={handleClose}
                    className='slds-button slds-button--brand button1' >
                    Cancel
                  </button>
              </span>
              <span>
                <button
                  type='button'
                  onClick={() => {
                      sendRequest();
                      handleClose();
                    }}
                  className='slds-button slds-button--brand button2' >
                  Delete
                </button>
              </span>
            </span>
            </div>
          </div>
        </div>
        <div className='slds-backdrop slds-backdrop--open'></div>
      </div>
    );
  }
}
