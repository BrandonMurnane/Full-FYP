import React from 'react';
import { Link } from 'react-router';

export default class PatchSubmit extends React.Component {
  render() {
    const { request, isOpen, onClose: handleClose } = this.props;
    if (!isOpen) return null;

    let successContentText;
    const successHeaderText = 'Success!';
    const errorHeaderText = 'Oops. Something went wrong!';

    if (handleClose){
      successContentText = 'Your Event was updated successfully.';
    } else {
      successContentText = 'Your Event was deleted successfully.';
    }

    if (request.isPending) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    } else if (request.isCompleted) {
      let successButton;
      if (handleClose){
        successButton = (
          <button
            type='button'
            onClick={handleClose}
            className='slds-button slds-button--brand largeButton' >
            Close
          </button>
          );
      } else {
        successButton = (
          <Link to='/events' >
            <button
              type='button'
              className='slds-button slds-button--brand largeButton' >
              Close
            </button>
          </Link>
        );
      }
      return this.renderBanner(successHeaderText, successContentText, successButton, 'approval');
    } else { // eslint-disable-line
      const errorContentText = 'Error: ' + request.error;
      const errorButton = (
        <button
          type='button'
          onClick={handleClose}
          className='slds-button slds-button--brand largeButton' >
          Try Again
        </button>
      );
      return this.renderBanner(errorHeaderText, errorContentText, errorButton, 'close');
    }
  }

  renderBanner(headerText, contentText, button, icon) {
    return (
      <div className='success-banner'>
        <div aria-hidden='false' role='dialog' className='slds-modal slds-fade-in-open'>
          <div className='slds-modal__container'>
            <div className='slds-modal__header'>
              <span className='slds-icon__container slds-p-around--x-small
                slds-icon-action-share-thanks slds-m-bottom--x-small'>
                <svg aria-hidden='true' className='slds-icon slds-icon-action-share-thanks icon--medium'>
                  <use xlinkHref={ '/icons/action-sprite/svg/symbols.svg#' + icon }></use>
                </svg>
              </span>
              <h2 className='slds-text-heading--medium'>{ headerText }</h2>
              <p className='slds-m-top--x-small'>{ contentText }</p>
            </div>
            <div className='slds-modal__menu'>
              { button }
            </div>
          </div>
        </div>
        <div className='slds-backdrop slds-backdrop--open'></div>
      </div>
    );
  }
}
