'use strict';
import { connectRequests } from '../../highOrderComponents/requests';

// Requests Connection
function mapStateToRequests(state, ownProps) {
  return {
    getCategory: {
      method: 'GET',
      url: '/categories/' + ownProps.params.key,
      onLoad: true,
      onPropUpdate: true,
      responseAlias: 'initialData'
    },
    patchCategory: {
      method: 'PATCH',
      url: '/categories/' + ownProps.params.key
    },
    deleteCategory: {
      method: 'DELETE',
      url: '/categories/' + ownProps.params.key,
    }
  };
}

export default connectRequests(mapStateToRequests);
