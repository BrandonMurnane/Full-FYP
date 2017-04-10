'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state) {
  return {
    postCategory: {
      method: 'POST',
      url: '/categories'
    }
  };
}

export default connectRequests(mapStateToRequests);
