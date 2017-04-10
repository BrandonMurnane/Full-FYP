import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Errors from './Errors.jsx';
import './form.scss';


export default class Input extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    labelKey: React.PropTypes.string,
    label: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    showErrors: React.PropTypes.func,
    errors: React.PropTypes.array,
  }
  render() {
    const { name, value, labelKey, label, readOnly, disabled, onChange, showErrors, errors } = this.props;

    const classes = classnames({
      'slds-form-element': true,
      'slds-has-error': errors.length > 0 && showErrors
    });

    return (
      <div className={classes}>
      <legend className="slds-form-element__label slds-form-element__label--top slds-text-heading--small">
        { label }
      </legend>
        <div className='slds-form-element__control form-width'>
          <input
            className='slds-input'
            type='text'
            name={name}
            value={value}
            onChange={onChange}
            placeholder={label||name}
            readOnly={readOnly}
            disabled={disabled}
          />
        </div>
         <Errors errors={errors} showErrors={showErrors}/>
      </div>
    );
  }
}
