'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state) {
  return {
    postEvent: {
      method: 'POST',
      url: '/events'
    }
  };
}

export default connectRequests(mapStateToRequests);
