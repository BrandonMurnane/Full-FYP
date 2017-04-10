import React, { PropTypes } from 'react';

export default class ModalContent extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <div className="slds-modal__content modal">
        {children}
      </div>
    )
  }
}

