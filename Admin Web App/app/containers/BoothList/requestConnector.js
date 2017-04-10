'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    booths: {
      method: 'GET',
      url: '/booths',
      onLoad: true
    }
  };
}

export default connectRequests(mapStateToRequests);
