'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    categories: {
      method: 'GET',
      url: '/categories',
      onLoad: true
    }
  };
}

export default connectRequests(mapStateToRequests);
