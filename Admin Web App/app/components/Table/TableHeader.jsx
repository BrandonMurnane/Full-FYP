import React from 'react';
import { Link } from 'react-router';
import './TableHeader.scss';

export default class TableHeader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    link: React.PropTypes.string
  }

  render() {
    const { title, link } = this.props;
    return (
      <div className='slds-page-header tableHeader'>
        <h1 className='slds-text-heading--medium slds-truncate'> { title } </h1>
        <Link to={ link } className="slds-button slds-button--neutral newButton">+ New</Link>
      </div>
    );
  }
}
