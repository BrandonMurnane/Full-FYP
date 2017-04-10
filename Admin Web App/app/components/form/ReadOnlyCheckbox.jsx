import React from 'react';
import _ from 'lodash';

export default class ReadOnlyCheckbox extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    value: React.PropTypes.bool,
    label: React.PropTypes.string
  }
  render() {
    const { checked, value, label } = this.props;

    let inputValue = false;
    if (_.isBoolean(value)) {
      inputValue = value;
    } else if (_.isBoolean(checked)) {
      inputValue = checked;
    }

    return (
      <div className='slds-form-element'>
        <div className='slds-form-element__control'>
          <span className='slds-checkbox'>
            <input type='checkbox' checked={inputValue} disabled/>
            <label className='slds-checkbox__label'>
              <span className='slds-checkbox--faux'></span>
              <span className='slds-form-element__label'>{label}</span>
            </label>
          </span>
        </div>
      </div>
    );
  }
}
