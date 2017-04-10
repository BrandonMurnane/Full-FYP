import React from 'react';

/**
 * React Component to that manages a group of checkboxes for React Redux fields.
 * Each checkbox its its own field whose name is the field name and value is if its
 * selected or not.
 */
export default class Errors extends React.Component {
  static propTypes = {
    errors: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.string
    ])
  }

  render() {
    const { errors } = this.props;
    if (!errors || errors.length < 1) return null;

    return (
      <div className='slds-has-error'>
        {errors.map((error, index) => {
          return <span key={index} className="slds-form-element__help">{error}</span>
        })}
      </div>
    );
  }
}
