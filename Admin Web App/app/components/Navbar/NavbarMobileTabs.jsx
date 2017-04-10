import React from 'react';
import { Link } from 'react-router';
import './NavbarMobileTabs.scss';

export default class NavbarMobileTabs extends React.Component {
  constructor(){
    super();
    this.state = {
      boolVal: true
    };
    this.clicked = this.clicked.bind(this);
  }
  clicked(){
    this.setState({ boolVal: !this.state.boolVal });
  }
  render(){
    if (this.state.boolVal){
      return (
        <div className='navbar-tabs navbar-mobile-tabs'>
          <span className='hamburger' onClick={ this.clicked }></span>
        </div>
      );
    } else {
      return (
        <div className='navbar-tabs navbar-mobile-tabs'>
          <span className='close' onClick={ this.clicked }></span>
          <div className='menu'>
            <div>
              <Link
                to='/booths'
                className='menu-text'
                onClick={ this.clicked }>
                Booths
              </Link>
            </div>
            <div>
              <Link
                to='/events'
                className='menu-text'
                onClick={ this.clicked }>
                Events
              </Link>
            </div>
            <div>
              <Link
                to='/categories'
                className='menu-text'
                onClick={ this.clicked }>
                Categories
              </Link>
            </div>
            <div>
              <Link
                to='/userGroups'
                className='menu-text'
                onClick={ this.clicked }>
                User Groups
              </Link>
            </div>
            <div>
              <Link
                to='/visits'
                className='menu-text'
                onClick={ this.clicked }>
                Visits
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
};
