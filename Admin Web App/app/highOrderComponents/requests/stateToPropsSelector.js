import { createSelector } from 'reselect';
import _ from 'lodash';

// Creates a selector that merges requests stored in state and requests
// returned from the mapStateToRequests selector
// Basically merges request state and request configuration
export function createStateToPropsSelector(mapStateToRequests) {
  const stateRequestSelector = (state) => state.requests;

  return createSelector(
    stateRequestSelector,
    mapStateToRequests,
    (stateRequests, mappedRequests) => {
      const requests = {};
      _.map(mappedRequests, (mappedRequest, key) => {
        const stateRequest = stateRequests[key] || {};
        // merge defaults with values in state with values from selector
        const request = {
          key,
          url: null,
          value: null,
          error: null,
          isRequested: false,
          isCompleted: false,
          isErrored: false,
          isPending: false,
          isRefreshing: false,
          ...stateRequest,
          ...mappedRequest,
          method: mappedRequest.method || stateRequest.method || 'GET'
        };
        requests[key] = request;
      });

      return { requests };
    }
  );
}
