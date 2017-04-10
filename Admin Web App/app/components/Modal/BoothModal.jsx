import React from 'react';
import Modal from './index.js';

export default class BoothModal extends React.Component {
  static propTypes = {
    submitModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    booth: React.PropTypes.object,
    isOpen: React.PropTypes.bool,
  };

  render() {
    const { closeModal, submitModal, booth, isOpen } = this.props;

    if (!isOpen) return null;

    return (
      <Modal isOpen={isOpen} closeModal={closeModal} submitModal={submitModal}>
      <Modal.Header>
        <h2 className='slds-text-heading--medium'>
          {booth.key}
        </h2>
      </Modal.Header>
        <Modal.Content>
        <div className='slds-m-bottom--large modal-section-title'>
            <span className='slds-m-horizontal--large'>Booth</span>
        </div>
        <ul>
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
            <b>
              Booth Name:&nbsp;
            </b>
              {booth.key}
            </div>
            {booth.description &&
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
            <b>
              Booth Description:&nbsp;
            </b>
              {booth.description}
            </div>
            }
            {booth.owner &&
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
             <b>
               Booth Owner:&nbsp;
             </b>
                {booth.owner}
            </div>
            }
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
            { booth.categoryKeys.length > 0 &&
              <div className='slds-m-bottom--xx-small'>
                <span>
                <b>
                  Categories:&nbsp;
                </b>
                </span>
                { booth.categoryKeys.map((categoryKey, i) => {
                  return (
                    <span key={i}>
                      {categoryKey}
                      { booth.categoryKeys.length - 1 === i ? '' : ','}
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
