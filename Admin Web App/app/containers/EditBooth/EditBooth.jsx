import React from 'react';

import { Input, TextArea, CheckboxGroup } from '../../components/form';
import { PatchSubmit, DeleteSubmit } from '../../components/Booth';
import BoothModal from '../../components/Modal/BoothModal.jsx';


export default class EditBooth extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    modal: React.PropTypes.object,
    requests: React.PropTypes.object,
    openModal: React.PropTypes.func,
    openVerifyDelete: React.PropTypes.func,
    verifyDelete: React.PropTypes.object,
    closeModal: React.PropTypes.func,
    closeVerifyDelete: React.PropTypes.func,
    submitBooth: React.PropTypes.func,
    boothDelete: React.PropTypes.func,
    reset: React.PropTypes.func,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { form, modal, requests, openVerifyDelete, verifyDelete, closeVerifyDelete } = this.props;
    const { patchBooth, deleteBooth } = requests;
    const { openModal, closeModal, submitBooth, boothDelete } = this.props;

    if (!requests.getBooth.isCompleted) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    }

    return (
      <div className='slds-grid slds-grid--align-center slds-m-bottom--xx-large'>
        <BoothModal
          booth={form.data}
          isOpen={modal.isOpen && !patchBooth.isRequested}
          closeModal={closeModal}
          submitModal={submitBooth} />
        <PatchSubmit
          request={patchBooth.isRequested ? patchBooth: deleteBooth}
          isOpen={(modal.isOpen && patchBooth.isRequested) || deleteBooth.isRequested}
          onClose={patchBooth.isRequested ? closeModal: null} />
        <DeleteSubmit
          sendRequest={boothDelete}
          isOpen={verifyDelete.isOpen}
          onClose={closeVerifyDelete} />
        <div className='slds-col slds-size--10-of-12'>
          <h1 className='slds-text-heading--medium slds-m-vertical--x-large'>Edit Booth</h1>
          <form id='editbooth' className='slds-form--stacked slds-col--padded'>
            <div className='slds-m-bottom--large'>
                <Input {...form.fields.key} label='Booth Name'/>
              </div>
              <div className='slds-m-bottom--large'>
                <TextArea {...form.fields.description} rows='10' label='Booth Description'/>
              </div>
              <div className='slds-m-bottom--large'>
                <Input {...form.fields.owner} label='Booth Owner'/>
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
