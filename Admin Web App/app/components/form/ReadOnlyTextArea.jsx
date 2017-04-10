import React from 'react';

export default class ReadOnlyTextArea extends React.Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    label: React.PropTypes.string
  }

  render() {
    const { label, value } = this.props;
    return (
      <div className='slds-form-element'>
        <span className='slds-form-element__label'>{ label }</span>
        <div className='slds-form-element__control slds-has-divider--bottom'>
          <div className='slds-form-element__static slds-text-longform form--textarea'>{ value }</div>
        </div>
      </div>
    );
  }
}
