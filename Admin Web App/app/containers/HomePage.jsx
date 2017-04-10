
import React from 'react';
import { Navbar } from '../components';
import { connectRequests } from '../highOrderComponents/requests/';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { requests, location } = this.props;
    return (
      <div className='slds'>
        <div className='slds-grid slds-grid--vertical'>
        <div className='slds-col'>
          <Navbar pathname={location.pathname} />
        </div>
        <div className='slds-col slds-size--1-of-1'>
          { React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { requests: requests });
          })}
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToRequests(state) {
  return {
    booths: {
      url: '/booths',
      onLoad: true
    },
    categories: {
      url: '/categories',
      onLoad: true
    },
    events: {
      url: '/events',
      onLoad: true
    },
    userGroups: {
      url: '/userGroups',
      onLoad: true
    },
    visits: {
      url: '/visits',
      onLoad: true
    }
  };
}

export default connectRequests(mapStateToRequests)(HomePage);
