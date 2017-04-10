'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state) {
  return {
    postBooth: {
      method: 'POST',
      url: '/booths'
    }
  };
}

export default connectRequests(mapStateToRequests);
