import React, { PropTypes } from 'react';
import Errors from './Errors.jsx'
import classnames from 'classnames';


export default class Checkbox extends React.Component {
  render() {

    const { name, value, errors, showErrors } = this.props;
    const { onChange, onBlur, onFocus } = this.props;
    const { label, text, labelKey, valueKey } = this.props;

    const classes = classnames({
      'slds-form-element': true,
      'slds-m-top--x-large': true,
      'slds-has-error': errors.length > 0 && showErrors
    });

    const _onChange = (event) => {
      console.log('##event.target', event.target);
      console.log('##event.target.value', event.target.value);
      console.log('##event.target.checked', event.target.checked);


      onChange(event);
    }

    return (
      <div className={classes}>
        <legend className="slds-form-element__label slds-form-element__label--top slds-text-heading--small">
          {label}
        </legend>
        <div className="slds-form-element__control form-width">
          <label
            className='slds-checkbox'
            htmlFor={ 'checkbox' + name } >
          <input
            id={ 'checkbox' + name }
            type='checkbox'
            name={name}
            checked={value}
            onChange={_onChange}
            onBlur={onBlur}
            onFocus={onFocus} />
            <span className='slds-checkbox--faux'></span>
            <span className='slds-form-element__label'>
              {valueKey}
              {text}
            </span>
          </label>
        </div>
        <Errors errors={errors} showErrors={showErrors}/>
      </div>
    );
  }
}
