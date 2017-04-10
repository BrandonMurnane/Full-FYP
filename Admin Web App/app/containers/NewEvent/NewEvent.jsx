import React from 'react';

import { Input, TextArea ,CheckboxGroup } from '../../components/form';
import { Link } from 'react-router';
import { PostSubmit } from '../../components/Event';
import EventModal from '../../components/Modal/EventModal.jsx';

export default class NewEvent extends React.Component {
  static propTypes = {
    form: React.PropTypes.object,
    modal: React.PropTypes.object,
    requests: React.PropTypes.object,
    openModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    submitEvent: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    previousPage: React.PropTypes.func,
    reset: React.PropTypes.func,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { form, modal, requests } = this.props;
    const { openModal, closeModal, submitEvent } = this.props;

    if (requests.postEvent.isPending || requests.postEvent.isCompleted ||
      requests.postEvent.isErrored) {
      return <PostSubmit request={requests.postEvent}/>;
    }

    return (
      <div className='slds-grid slds-grid--align-center slds-m-bottom--xx-large'>
        <EventModal
          event={form.data}
          isOpen={modal.isOpen}
          closeModal={closeModal}
          submitModal={submitEvent}/>
          <div className='slds-col slds-size--10-of-12'>
          <h1 className='slds-text-heading--medium slds-m-vertical--x-large'>New Event</h1>
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
