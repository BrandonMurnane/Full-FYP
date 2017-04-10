import React from 'react';
import ModalFooter from './ModalFooter.jsx';
import './Modal.scss';

export default class Modal extends React.Component {

  render() {
    const { children, isOpen, closeModal, submitModal } = this.props;

    if (!isOpen) return null;

    const childrenArray = React.Children.toArray(children);

    // injects closeModal into Header
    childrenArray[0] = React.cloneElement(childrenArray[0], { closeModal });

    // if only 2 children, assume no footer and add one
    // else just inject props
    if (childrenArray.length < 3) {
      childrenArray.push(<ModalFooter closeModal={closeModal} submitModal={submitModal}/>);
    } else {
      childrenArray[2] = React.cloneElement(childrenArray[2], { closeModal, submitModal });
    }

    return (
      <div>
        <div aria-hidden='false' role='dialog' className='slds-modal slds-modal--large slds-fade-in-open'>
          <div className='slds-modal__container modal'>
            { childrenArray }
          </div>
        </div>
        <div className="slds-backdrop slds-backdrop--open"></div>
      </div>
    );
  }
}
