import React from 'react';
import _ from 'lodash';

/**
 *
 * Connects a wrapped component to requests state and provides request handlers via props. Also dispatches
 * requests based on page load and stale properties.
 *
 * Internal connect function. Should be in redux connect component and around wrapped component
 *
 * Expects to be passed dispatch function, handleInitialization function and requestState object
 * through properties.
 *
 */
export function withHOC(WrappedComponent) {
  const wrappedComponentName = WrappedComponent.displayName ||
                               WrappedComponent.name || 'Component';

  return class RequestConnect extends React.Component {
    static displayName= `withRequests(${wrappedComponentName})`;
    static propTypes = {
      _requests: React.PropTypes.object,
      requests: React.PropTypes.object
    }

    /**
     * Run before component is mounted.
     *
     * Perform an requests marked with onLoad = true
     *
     */
    componentWillMount() {
      const { _requests } = this.props;
      _.map(_requests, (request) => {
        request.initializeRequest();
        if (request.onLoad) {
          request.handleRequest();
        }
      });
    }

    /**
     * Resets local requests on unmount
     */
    componentWillUnmount() {
      const { _requests } = this.props;
      _.map(_requests, (request) => {
        request.handleReset();
      });
    }

    componentWillReceiveProps(nextProps) {
      const { _requests: nextRequests } = nextProps;
      const { _requests: previousRequests } = this.props;
      // Compare new requests to ones in the state
      // If any URLs are out of date, repeform the request
      _.map(nextRequests, (nextRequest, key) => {
        const previousRequest = previousRequests[key];

        // Rerequest if onUpdate is truthy and the url changed
        if (previousRequest && nextRequest.onUpdate && previousRequest.url !== nextRequest.url) {
          nextRequest.handleRequest();
        }

        // if new request then initialize
        if (!previousRequest) {
          nextRequest.initializeRequest();
        }
      });
    }

    render() {
      // Catch components props and don't pass them
      const { _requests, requests, ...passedProps } = this.props;
      const combinedRequests = { ..._requests, ...requests };

      return <WrappedComponent {...passedProps} requests={combinedRequests} />;
    }
  };
}
