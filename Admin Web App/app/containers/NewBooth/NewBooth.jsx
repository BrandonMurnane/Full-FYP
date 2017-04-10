import React from 'react';
import moment from 'moment';

import { Input, TextArea , CheckboxGroup } from '../../components/form';
import { PostSubmit } from '../../components/Booth';
import { Link } from 'react-router';
import BoothModal from '../../components/Modal/BoothModal.jsx';

export default class NewBooth extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    modal: React.PropTypes.object,
    requests: React.PropTypes.object,
    openModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    submitBooth: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    previousPage: React.PropTypes.func,
    reset: React.PropTypes.func,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { form, modal, requests } = this.props;
    const { openModal, closeModal, submitBooth, nextPage, previousPage } = this.props;

    if (requests.postBooth.isPending || requests.postBooth.isCompleted ||
      requests.postBooth.isErrored) {
      return <PostSubmit request={requests.postBooth}/>;
    }

    console.log(form.fields.categoryKeys.options.length)

    return (
      <div className='slds-grid slds-grid--align-center slds-m-bottom--xx-large'>
        <BoothModal
          booth={form.data}
          isOpen={modal.isOpen}
          closeModal={closeModal}
          submitModal={submitBooth}/>
          <div className='slds-col slds-size--10-of-12'>
          <h1 className='slds-text-heading--medium slds-m-vertical--x-large'>New Booth</h1>
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
             {form.fields.categoryKeys.options.length > 0 ?
              <div className='slds-m-bottom--large'>
                <CheckboxGroup {...form.fields.categoryKeys} label='Categories Select one or more' />
              </div>: <div> Please add category Keys <Link to='/categories/new' >here </Link> first</div>
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
