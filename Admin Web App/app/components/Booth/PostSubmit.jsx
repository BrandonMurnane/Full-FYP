import React from 'react';
import { Link } from 'react-router';
import './PostSubmit.scss';

export default class PostSubmit extends React.Component {
  render() {
    const { request } = this.props;
    const booth = request.value;
    const successHeaderText = 'Success!';
    const successContentText = 'Your Booth was posted successfully.';
    const errorHeaderText = 'Oops. Something went wrong!';

    if (request.isPending) {
      return (
        <div className='slds-spinner--large'>
          <img src='/images/spinners/slds_spinner_brand.gif' alt='Loading...' />
        </div> );
    }
    else if (request.isCompleted) {
      const detailsUrl = '/booths/' + booth.key;
      const closeUrl= '/booths';
      const successButton = (
       <span>
         <span className='button1'>
          <Link to={ detailsUrl }>
            <button
              type='button'
              className='slds-button slds-button--brand button1' >
              Details
            </button>
          </Link>
          </span>
          <span>
            <Link to={ closeUrl }>
            <button
              type='button'
              className='slds-button slds-button--brand button2' >
              Close
            </button>
          </Link>
         </span>
       </span>
      );
      return this.renderBanner(successHeaderText, successContentText, successButton, 'approval');
    } else {
      const errorContentText = 'Error: ' + request.error;
      const errorButton = (
        <span>
        <Link to={ closeUrl }>
          <button
            type='button'
            className='slds-button slds-button--brand largeButton' >
            Try Again
          </button>
        </Link>
        </span>
      );
      return this.renderBanner(errorHeaderText, errorContentText, errorButton, 'close');
    }
  }

  renderBanner(headerText, contentText, button, icon) {
    return (
      <div className='success-banner'>
        <div aria-hidden='false' role='dialog' className='slds-modal slds-fade-in-open'>
          <div className='slds-modal__container'>
            <div className='slds-modal__header'>
              <span className='slds-icon__container slds-p-around--x-small slds-icon-action-share-thanks slds-m-bottom--x-small'>
                <svg aria-hidden='true' className='slds-icon slds-icon-action-share-thanks icon--medium'>
                  <use xlinkHref={ '/icons/action-sprite/svg/symbols.svg#' + icon }></use>
                </svg>
              </span>
              <h2 className='slds-text-heading--medium'>{ headerText }</h2>
              <p className='slds-m-top--x-small'>{ contentText }</p>
            </div>
            <div className='slds-modal__menu'>
              { button }
            </div>
          </div>
        </div>
        <div className='slds-backdrop slds-backdrop--open'></div>
      </div>
    );
  }
}