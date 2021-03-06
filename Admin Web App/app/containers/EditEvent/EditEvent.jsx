import React from 'react';

import { Input, TextArea, CheckboxGroup } from '../../components/form';
import { PatchSubmit, DeleteSubmit } from '../../components/Event';
import EventModal from '../../components/Modal/EventModal.jsx';


export default class EditEvent extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    modal: React.PropTypes.object,
    requests: React.PropTypes.object,
    openModal: React.PropTypes.func,
    openVerifyDelete: React.PropTypes.func,
    verifyDelete: React.PropTypes.object,
    closeModal: React.PropTypes.func,
    closeVerifyDelete: React.PropTypes.func,
    submitEvent: React.PropTypes.func,
    eventDelete: React.PropTypes.func,
    reset: React.PropTypes.func,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { form, modal, requests, openVerifyDelete, verifyDelete, closeVerifyDelete } = this.props;
    const { patchEvent, deleteEvent } = requests;
    const { openModal, closeModal, submitEvent, eventDelete } = this.props;

    if (!requests.getEvent.isCompleted) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    }

    return (
      <div className='slds-grid slds-grid--align-center slds-m-bottom--xx-large'>
        <EventModal
          event={form.data}
          isOpen={modal.isOpen && !patchEvent.isRequested}
          closeModal={closeModal}
          submitModal={submitEvent} />
        <PatchSubmit
          request={patchEvent.isRequested ? patchEvent: deleteEvent}
          isOpen={(modal.isOpen && patchEvent.isRequested) || deleteEvent.isRequested}
          onClose={patchEvent.isRequested ? closeModal: null} />
        <DeleteSubmit
          sendRequest={eventDelete}
          isOpen={verifyDelete.isOpen}
          onClose={closeVerifyDelete} />
        <div className='slds-col slds-size--10-of-12'>
          <h1 className='slds-text-heading--medium slds-m-vertical--x-large'>Edit Event</h1>
          <form id='editevent' className='slds-form--stacked slds-col--padded'>
            <div className='slds-m-bottom--large'>
                <Input {...form.fields.key} label='Event Name'/>
              </div>
              <div className='slds-m-bottom--large'>
                <TextArea {...form.fields.description} rows='10' label='Event Description'/>
              </div>
              <div className='slds-m-bottom--large'>
                <Input {...form.fields.speaker} label='Event Speaker'/>
              </div>
              <div className='slds-m-bottom--large'>
                <CheckboxGroup {...form.fields.categoryKeys} label='Categories Select one or more' />
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
