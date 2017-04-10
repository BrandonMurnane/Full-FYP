import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import NavbarMobileTabs from './NavbarMobileTabs.jsx';
import './Navbar.scss';

export default class Navbar extends React.Component {
  static propTypes = {
    pathname: React.PropTypes.string
  }
  render() {
    const { pathname } = this.props;
    const path = pathname.split('/')[1];

    return (
      <nav className='navbar'>
        <div className='navbar-header'>
          <Link to = '/'>
            <h1> FYP Admin </h1>
          </Link>
        </div>
        <div className='navbar-tabs nav-tabs'>
          <ul className='nav'>
            <li>
              <Link
                to='/booths'
                onClick={ this.handleClickTab }
                className={classnames({ active: path === 'booths' })}>
                Booths
              </Link>
            </li>
            <li>
              <Link
                to='/events'
                onClick={ this.handleClickTab }
                className={classnames({ active: path === 'events' })}>
                Events
              </Link>
            </li>
            <li>
              <Link
                to='/categories'
                onClick={ this.handleClickTab }
                className={classnames({ active: path === 'categories' })}>
                Categories
              </Link>
            </li>
            <li>
              <Link
                to='/userGroups'
                onClick={ this.handleClickTab }
                className={classnames({ active: path === 'userGroups' })}>
                User Groups
              </Link>
            </li>
            <li>
              <Link
                to='/visits'
                onClick={ this.handleClickTab }
                className={classnames({ active: path === 'visits' })}>
                Visits
              </Link>
            </li>
          </ul>
        </div>
        <NavbarMobileTabs />
      </nav>
    );
  }
}
