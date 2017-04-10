import React from 'react';

import { Input, TextArea, CheckboxGroup } from '../../components/form';
import { PatchSubmit, DeleteSubmit } from '../../components/Category';
import CategoryModal from '../../components/Modal/CategoryModal.jsx';


export default class EditCategory extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    modal: React.PropTypes.object,
    requests: React.PropTypes.object,
    openModal: React.PropTypes.func,
    openVerifyDelete: React.PropTypes.func,
    verifyDelete: React.PropTypes.object,
    closeModal: React.PropTypes.func,
    closeVerifyDelete: React.PropTypes.func,
    submitCategory: React.PropTypes.func,
    categoryDelete: React.PropTypes.func,
    reset: React.PropTypes.func,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { form, modal, requests, openVerifyDelete, verifyDelete, closeVerifyDelete } = this.props;
    const { patchCategory, deleteCategory } = requests;
    const { openModal, closeModal, submitCategory, categoryDelete } = this.props;

    if (!requests.getCategory.isCompleted) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div>
      );
    }

    return (
      <div className='slds-grid slds-grid--align-center slds-m-bottom--xx-large'>
        <CategoryModal
          category={form.data}
          isOpen={modal.isOpen && !patchCategory.isRequested}
          closeModal={closeModal}
          submitModal={submitCategory} />
        <PatchSubmit
          request={patchCategory.isRequested ? patchCategory: deleteCategory}
          isOpen={(modal.isOpen && patchCategory.isRequested) || deleteCategory.isRequested}
          onClose={patchCategory.isRequested ? closeModal: null} />
        <DeleteSubmit
          sendRequest={categoryDelete}
          isOpen={verifyDelete.isOpen}
          onClose={closeVerifyDelete} />
        <div className='slds-col slds-size--10-of-12'>
          <h1 className='slds-text-heading--medium slds-m-vertical--x-large'>Edit Category</h1>
          <form id='editcategory' className='slds-form--stacked slds-col--padded'>
            <div className='slds-m-bottom--large'>
                <Input {...form.fields.key} label='Category Name'/>
              </div>
              <div className='slds-m-bottom--large'>
                <TextArea {...form.fields.description} rows='10' label='Category Description'/>
              </div>
              <div className='slds-m-bottom--large'>
                <CheckboxGroup {...form.fields.categoryKeys} label='Related Categories Select one or more' />
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
