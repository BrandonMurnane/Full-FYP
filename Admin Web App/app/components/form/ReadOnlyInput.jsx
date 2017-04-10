import React from 'react';

export default class ReadOnlyInput extends React.Component {
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
          <span className='slds-form-element__static'>{ value }</span>
        </div>
      </div>
    );
  }
}
