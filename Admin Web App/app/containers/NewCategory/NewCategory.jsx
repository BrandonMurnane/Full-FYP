import React from 'react';

import { Input, TextArea, CheckboxGroup } from '../../components/form';
import { PostSubmit } from '../../components/Category';
import CategoryModal from '../../components/Modal/CategoryModal.jsx';

export default class NewCategory extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    modal: React.PropTypes.object,
    requests: React.PropTypes.object,
    openModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    submitCategory: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    previousPage: React.PropTypes.func,
    reset: React.PropTypes.func,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { form, modal, requests } = this.props;
    const { openModal, closeModal, submitCategory } = this.props;

    if (requests.postCategory.isPending || requests.postCategory.isCompleted ||
      requests.postCategory.isErrored) {
      return <PostSubmit request={requests.postCategory}/>;
    }

    return (
      <div className='slds-grid slds-grid--align-center slds-m-bottom--xx-large'>
        <CategoryModal
          category={form.data}
          isOpen={modal.isOpen}
          closeModal={closeModal}
          submitModal={submitCategory}/>
          <div className='slds-col slds-size--10-of-12'>
          <h1 className='slds-text-heading--medium slds-m-vertical--x-large'>New Category</h1>
          <form id='editcategory' className='slds-form--stacked slds-col--padded'>
            <div className='slds-m-bottom--large'>
                <Input {...form.fields.key} label='Category Name'/>
              </div>
              <div className='slds-m-bottom--large'>
                <TextArea {...form.fields.description} rows='10' label='Category Description'/>
              </div>
            {/* makes sure the page doesnt error if no categoryKeys */}
            {form.fields.categoryKeys.value.length ?
              <div className='slds-m-bottom--large'>
                <CheckboxGroup {...form.fields.categoryKeys} label='Related Categories Select one or more' />
              </div>:null
            }
              <button type='button' className='slds-button slds-button--brand  slds-m-top--x-large' onClick={openModal}>
                Save
              </button>
          </form>
        </div>
      </div>
    );
  }
}
