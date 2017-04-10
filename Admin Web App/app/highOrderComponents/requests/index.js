import { withHOC } from './connectRequestsHOC.jsx';
import { connect as connectRedux } from 'react-redux';

import { createStateToPropsSelector } from './stateToPropsSelector';
import { createMergePropsSelector } from './mergePropsSelector';

/**
 * High Order component to connect Wrapped Component to Requests via redux. Component is wrapped once with Requests component
 * that makes configurable http requests and provides handlers to Component. Also provides component
 * with Requests state. It is wrapped again in a redux-react connector that provides the request state and dispatch to the
 * Requests component.
 *
 */


export function connectRequests(mapStateToRequests, requestHandler) {

  const mapStateToProps = createStateToPropsSelector(mapStateToRequests);
  const mergeProps = createMergePropsSelector();

  return function(WrappedComponent) {
    const RequestConnectedComponent = withHOC(WrappedComponent);

    const ReduxConnectedComponent = connectRedux(mapStateToProps, null, mergeProps)(RequestConnectedComponent)
    return ReduxConnectedComponent
  }
}
