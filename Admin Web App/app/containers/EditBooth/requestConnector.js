'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    getBooth: {
      method: 'GET',
      url: '/booth/' + ownProps.params.key,
      onLoad: true,
      onPropUpdate: true,
      responseAlias: 'initialData'
    },
    patchBooth: {
      method: 'PATCH',
      url: '/booth/' + ownProps.params.key
    },
    deleteBooth: {
      method: 'DELETE',
      url: '/booth/' + ownProps.params.key,
    }
  };
}

export default connectRequests(mapStateToRequests);
