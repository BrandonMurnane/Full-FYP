'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    getUserGroup: {
      method: 'GET',
      url: '/userGroups/' + ownProps.params.key,
      onLoad: true,
      onPropUpdate: true,
      responseAlias: 'initialData'
    },
    patchUserGroup: {
      method: 'PATCH',
      url: '/userGroups/' + ownProps.params.key
    },
    deleteUserGroup: {
      method: 'DELETE',
      url: '/userGroups/' + ownProps.params.key,
    }
  };
}

export default connectRequests(mapStateToRequests);
