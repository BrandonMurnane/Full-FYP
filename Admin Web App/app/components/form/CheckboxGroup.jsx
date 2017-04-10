import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './CheckboxGroup.scss';
import './form.scss';
import Errors from './Errors.jsx';

/**
 * React Component to that manages a group of checkboxes for React Redux fields.
 * Each checkbox its its own field whose name is the field name and value is if its
 * selected or not.
 */
export default class CheckboxGroup extends React.Component {

// searchValue  is the user typed value from searchbox used to filter instances
  constructor(){
    super();
    this.state = {
      searchValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ searchValue: event.target.value });
  }


  render() {
    const { name, value, options, errors, showErrors } = this.props;
    const { onChange, onBlur, onFocus } = this.props;
    const { label, text, labelKey, valueKey } = this.props;
    const _valueKey = valueKey || 'label';


    const classNames = classnames({
      'slds-m-top--x-large': false,
      'slds-form-element': true,
      'slds-has-error': errors && errors.length > 0 && showErrors
    });
    let optionSearch;
    if (options.length > 50 && this.state.searchValue !== ''){ // eslint-disable-line
      optionSearch= options.filter((i) => i.value.toUpperCase().includes(this.state.searchValue.toUpperCase()));
    } else {
      optionSearch = options;
    }

    return (
      <div>
      <legend className='slds-form-element__label slds-form-element__label--top slds-text-heading--small'>
          {label}
        </legend>
      <div>
        {options.length > 10 ? // eslint-disable-line
        <input id='input'
          className='slds-m-bottom--medium form-width search' type='text'
          value={this.state.searchValue}
          onChange={this.handleChange}
          placeholder='Search' />:null
        }
      </div>
      <fieldset className={classNames} onFocus={onFocus} onBlur={onBlur} onChange={onChange}>
        <div className='slds-form-element__control checkbox-group-boxes slds-grid slds-wrap slds-container--small form-width'>
          { optionSearch.map((option, index) => {
            return (
              <label className='slds-checkbox slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-3'
              htmlFor={ option.id } key={index} >
                <input type='checkbox' checked={option.checked} id={option.id} name={option.name} value={option.value} />
                <span className='slds-checkbox--faux'></span>
                <span className='slds-form-element__label'>
                  {option.value}
                </span>
              </label>
            );
          })}
        </div>
        <Errors errors={errors} showErrors={showErrors}/>
      </fieldset>
      </div>
    );
  }
}
