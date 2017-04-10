'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    events: {
      method: 'GET',
      url: '/events',
      onLoad: true
    }
  };
}

export default connectRequests(mapStateToRequests);
