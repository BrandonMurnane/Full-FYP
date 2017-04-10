import React from 'react';

import { Input, TextArea } from '../../components/form';
import { PatchSubmit, DeleteSubmit } from '../../components/UserGroup';
import UserGroupModal from '../../components/Modal/UserGroupModal.jsx';


export default class EditUserGroup extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    modal: React.PropTypes.object,
    requests: React.PropTypes.object,
    openModal: React.PropTypes.func,
    openVerifyDelete: React.PropTypes.func,
    verifyDelete: React.PropTypes.object,
    closeModal: React.PropTypes.func,
    closeVerifyDelete: React.PropTypes.func,
    submitUserGroup: React.PropTypes.func,
    userGroupDelete: React.PropTypes.func,
    reset: React.PropTypes.func,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { form, modal, requests, openVerifyDelete, verifyDelete, closeVerifyDelete } = this.props;
    const { patchUserGroup, deleteUserGroup } = requests;
    const { openModal, closeModal, submitUserGroup, userGroupDelete } = this.props;

    if (!requests.getUserGroup.isCompleted) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    }

    return (
      <div className='slds-grid slds-grid--align-center slds-m-bottom--xx-large'>
        <UserGroupModal
          userGroup={form.data}
          isOpen={modal.isOpen && !patchUserGroup.isRequested}
          closeModal={closeModal}
          submitModal={submitUserGroup} />
        <PatchSubmit
          request={patchUserGroup.isRequested ? patchUserGroup: deleteUserGroup}
          isOpen={(modal.isOpen && patchUserGroup.isRequested) || deleteUserGroup.isRequested}
          onClose={patchUserGroup.isRequested ? closeModal: null} />
        <DeleteSubmit
          sendRequest={userGroupDelete}
          isOpen={verifyDelete.isOpen}
          onClose={closeVerifyDelete} />
        <div className='slds-col slds-size--10-of-12'>
          <h1 className='slds-text-heading--medium slds-m-vertical--x-large'>Edit UserGroup</h1>
          <form id='edituserGroup' className='slds-form--stacked slds-col--padded'>
            <div className='slds-m-bottom--large'>
                <Input {...form.fields.key} label='UserGroup Name'/>
              </div>
              <div className='slds-m-bottom--large'>
                <TextArea {...form.fields.description} rows='10' label='UserGroup Description'/>
              </div>
              <button type='button' className='slds-button slds-button--brand  slds-m-top--x-large' onClick={openModal}>
                Save
              </button>
              <button type='button' className='slds-button slds-button--neutral  slds-m-top--x-large'
                onClick={openVerifyDelete}>
                Delete
              </button>
          </form>
        </div>
      </div>
    );
  }
}
