import React from 'react';

import { Input, TextArea } from '../../components/form';
import { PostSubmit } from '../../components/UserGroup';
import UserGroupModal from '../../components/Modal/UserGroupModal.jsx';

export default class NewUserGroup extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    modal: React.PropTypes.object,
    requests: React.PropTypes.object,
    openModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    submitUserGroup: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    previousPage: React.PropTypes.func,
    reset: React.PropTypes.func,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { form, modal, requests } = this.props;
    const { openModal, closeModal, submitUserGroup } = this.props;

    if (requests.postUserGroup.isPending || requests.postUserGroup.isCompleted ||
      requests.postUserGroup.isErrored) {
      return <PostSubmit request={requests.postUserGroup}/>;
    }

    return (
      <div className='slds-grid slds-grid--align-center slds-m-bottom--xx-large'>
        <UserGroupModal
          userGroup={form.data}
          isOpen={modal.isOpen}
          closeModal={closeModal}
          submitModal={submitUserGroup}/>
          <div className='slds-col slds-size--10-of-12'>
          <h1 className='slds-text-heading--medium slds-m-vertical--x-large'>New UserGroup</h1>
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
          </form>
        </div>
      </div>
    );
  }
}
