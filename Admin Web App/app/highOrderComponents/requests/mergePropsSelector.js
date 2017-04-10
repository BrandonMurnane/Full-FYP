import { createSelector } from 'reselect';
import _ from 'lodash';

import { initializeRequest, handleRequest, handleReset } from './actions';

export function createMergePropsSelector() {
  const stateSelector = (stateProps, dispatchProps, ownProps) => stateProps;
  const dispatchSelector = (stateProps, dispatchProps, ownProps) => dispatchProps;
  const ownPropsSelector = (stateProps, dispatchProps, ownProps) => ownProps;

  return createSelector(
    stateSelector,
    dispatchSelector,
    ownPropsSelector,
    (stateProps, dispatchProps, ownProps) => {
      const { dispatch } = dispatchProps;
      const { requests } = stateProps;

      const onLoadRequests = [];
      const aliasedResponses = {};

      _.map(requests, (request, key) => {
        // wrap request with dispatch and default payload
        const boundHandleRequest = (payload) => {
          const requestPayload = { ...request.payload, ...payload };
          const _request = { ...request, payload: requestPayload };
          return dispatch(handleRequest(_request));
        };
        Object.defineProperty(request, 'handleRequest', { value: boundHandleRequest });

        // wrap reset with dispatch
        const boundHandleReset = () => {
          dispatch(handleReset(request));
        };
        Object.defineProperty(request, 'handleReset', { value: boundHandleReset });

        const boundinitializeRequest = () => {
          dispatch(initializeRequest(request));
        };
        Object.defineProperty(request, 'initializeRequest', { value: boundinitializeRequest });

        // if request is completed and has alias, inject the request's body into props
        // Useful for directly passing to child components without mapping
        if (request.responseAlias && request.isCompleted) {
          aliasedResponses[request.responseAlias] = request.value;
        }
      });

      return { _requests: requests, ...aliasedResponses, ...ownProps };
    });
}
