import React from 'react';
import classnames from 'classnames';

export default class Button extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    onClick: React.PropTypes.func,
    formElement: React.PropTypes.bool,
    brand: React.PropTypes.bool
  }
  render() {
    const { onClick, text, icon, formElement, brand } = this.props;

    const className = classnames(
      'slds-button',
      {
        'slds-button--neutral': !(brand),
        'slds-button--brand': brand,
        'slds-form-element': formElement
      }
    );

    return (
      <button type='button' className={className} onClick={onClick}>
        { icon &&
          <svg aria-hidden='true' className='slds-button__icon slds-button__icon--left'>
            <use xlinkHref={`/icons/utility-sprite/svg/symbols.svg#${icon}`}></use>
          </svg>
        }
        {text}
      </button>
    );
  }
}
