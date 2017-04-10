'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    userGroups: {
      method: 'GET',
      url: '/userGroups',
      onLoad: true
    }
  };
}

export default connectRequests(mapStateToRequests);
