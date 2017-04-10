'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state) {
  return {
    postUserGroup: {
      method: 'POST',
      url: '/userGroups'
    }
  };
}

export default connectRequests(mapStateToRequests);
