import React from 'react';
import Modal from './index.js';

export default class EventModal extends React.Component {
  static propTypes = {
    submitModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    event: React.PropTypes.object,
    isOpen: React.PropTypes.bool,
  };

  render() {
    const { closeModal, submitModal, event, isOpen } = this.props;

    if (!isOpen) return null;

    return (
      <Modal isOpen={isOpen} closeModal={closeModal} submitModal={submitModal}>
      <Modal.Header>
        <h2 className='slds-text-heading--medium'>
          {event.key}
        </h2>
      </Modal.Header>
        <Modal.Content>
        <div className='slds-m-bottom--large modal-section-title'>
            <span className='slds-m-horizontal--large'>Event</span>
        </div>
        <ul>
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
            <b>
              Event Name:&nbsp;
            </b>
              {event.key}
            </div>
            {event.description &&
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
            <b>
              Event Description:&nbsp;
            </b>
              {event.description}
            </div>
            }
            {event.speaker &&
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
             <b>
               Event Speaker:&nbsp;
             </b>
                {event.speaker}
            </div>
          }
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
              { event.categoryKeys.length > 0 &&
          <div className='slds-m-bottom--xx-small'>
            <span>
            <b>
              Categories:&nbsp;
            </b>
            </span>
            { event.categoryKeys.map((categoryKey, i) => {
              return (
                <span key={i}>
                  {categoryKey}
                  { event.categoryKeys.length - 1 === i ? '' : ','}
                </span>
              );
            }) }
          </div>
        }
           </div>
          </ul>
        </Modal.Content>
      </Modal>
    );
  }
}
