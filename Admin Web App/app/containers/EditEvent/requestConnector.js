'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    getEvent: {
      method: 'GET',
      url: '/event/' + ownProps.params.key,
      onLoad: true,
      onPropUpdate: true,
      responseAlias: 'initialData'
    },
    patchEvent: {
      method: 'PATCH',
      url: '/event/' + ownProps.params.key
    },
    deleteEvent: {
      method: 'DELETE',
      url: '/event/' + ownProps.params.key,
    }
  };
}

export default connectRequests(mapStateToRequests);
