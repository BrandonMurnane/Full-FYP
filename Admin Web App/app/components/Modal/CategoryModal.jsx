import React from 'react';
import Modal from './index.js';

export default class CategoryModal extends React.Component {
  static propTypes = {
    submitModal: React.PropTypes.func,
    closeModal: React.PropTypes.func,
    category: React.PropTypes.object,
    isOpen: React.PropTypes.bool,
  };

  render() {
    const { closeModal, submitModal, category, isOpen } = this.props;

    if (!isOpen) return null;

    return (
      <Modal isOpen={isOpen} closeModal={closeModal} submitModal={submitModal}>
      <Modal.Header>
        <h2 className='slds-text-heading--medium'>
          {category.key}
        </h2>
      </Modal.Header>
        <Modal.Content>
        <div className='slds-m-bottom--large modal-section-title'>
            <span className='slds-m-horizontal--large'>Category</span>
        </div>
        <ul>
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
              <b>
                Category Name:&nbsp;
              </b>
              {category.key}
            </div>
              {category.description &&
              <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
              <b>
                Category Description:&nbsp;
              </b>
                {category.description}
              </div>
            }
            <div className='slds-m-horizontal--large slds-m-bottom--x-small'>
              { category.categoryKeys.length > 0 &&
                <div className='slds-m-bottom--xx-small'>
                  <span>
                  <b>
                    Related Categories:&nbsp;
                  </b>
                  </span>
                  { category.categoryKeys.map((categoryKey, i) => {
                    return (
                      <span key={i}>
                        {categoryKey}
                        { category.categoryKeys.length - 1 === i ? '' : ','}
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
