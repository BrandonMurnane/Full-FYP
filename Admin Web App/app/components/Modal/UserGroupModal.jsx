import React from 'react';
import Modal from './index.js';

export default class UserGroupModal extends React.Component {
  static propTypes = {
    submitModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    userGroup: React.PropTypes.object,
    isOpen: React.PropTypes.bool,
  };

  render() {
    const { closeModal, submitModal, userGroup, isOpen } = this.props;

    if (!isOpen) return null;

    return (
      <Modal isOpen={isOpen} closeModal={closeModal} submitModal={submitModal}>
      <Modal.Header>
        <h2 className='slds-text-heading--medium'>
          {userGroup.key}
        </h2>
      </Modal.Header>
        <Modal.Content>
        <div className='slds-m-bottom--large modal-section-title'>
            <span className='slds-m-horizontal--large'>UserGroup</span>
        </div>
        <ul>
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
            <b>
              UserGroup Name:&nbsp;
            </b>
              {userGroup.key}
            </div>
            {userGroup.description &&
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
            <b>
              UserGroup Description:&nbsp;
            </b>
              {userGroup.description}
            </div>
            }
          </ul>
        </Modal.Content>
      </Modal>
    );
  }
}
