import React, { PropTypes } from 'react';

export default class ModalHeader extends React.Component {

  render() {
    const { children, closeModal } = this.props;


    return (
      <div className='slds-modal__header'>
        {children}
        <button className='slds-button slds-button--icon-inverse slds-modal__close' onClick={closeModal}>
          <svg aria-hidden='true' className='slds-button__icon slds-button__icon--large'>
            <use xlinkHref='/icons/action-sprite/svg/symbols.svg#close'></use>
          </svg>
          <span className='slds-assistive-text'>Close</span>
        </button>
      </div>
    )
  }
}
