import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import Errors from './Errors.jsx';
import './form.scss';

export default class TextArea extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    labelKey: PropTypes.string,
    errors: PropTypes.array.isRequired,
    rows: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { name, value, errors, showErrors, onChange, labelKey, label, rows } = this.props;

    const classes = classnames({
      'slds-form-element': true,
      'slds-has-error': errors.length > 0 && showErrors
    });

    const textValue = _.isString(value) ? value : '';
    const lines = Math.max(textValue.split(/\r\n|\r|\n/).length, 3);

    return (
      <div className={classes}>
      <legend className="slds-form-element__label slds-form-element__label--top slds-text-heading--small">
        {label}
      </legend>
        <div className='slds-form-element__control form-width'>
          <textarea
            className='slds-textarea'
            type='text'
            name={name}
            value={textValue}
            rows={lines}
            onChange={onChange}
            placeholder={label||name} />
        </div>
         <Errors errors={errors} showErrors={showErrors}/>
      </div>
    );
  }
}
