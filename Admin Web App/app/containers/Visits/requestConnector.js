'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    visits: {
      method: 'GET',
      url: '/visits',
      onLoad: true
    }
  };
}

export default connectRequests(mapStateToRequests);
