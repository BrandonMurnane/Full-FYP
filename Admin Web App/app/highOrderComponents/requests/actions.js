import { superAgentRequestHandler as requestHandler } from './superAgentRequestHandler'


export const INITIALIZATION = '@@requests/INITIALIZATION'
export function initializeRequest(request) {
  const action = {
    type: INITIALIZATION,
    key: request.key,
    request
  };

  return action;
}

export const REQUEST = '@@requests/REQUEST'
export const RESPONSE = '@@requests/RESPONSE'
export const ERROR = '@@requests/ERROR'
export function handleRequest(request) {
  return function(dispatch) {
    dispatch({
      type: REQUEST,
      key: request.key,
      method: request.method,
      url: request.url
    })
    if(request.onRequest) {
      dispatch(request.onRequest);
    }

    return requestHandler(request)
    .then(responseBody => {
      dispatch({
        type: RESPONSE,
        key: request.key,
        value: responseBody
      })
      if (request.onResponse) request.onResponse(responseBody, dispatch)
      return responseBody;
    })
    .catch(error => {
      console.log('error', error);
      console.error(error)
      dispatch({
        type: ERROR,
        key: request.key,
        error: error
      })
      if (request.onError) request.onError(response.body)
      if (process.env.NODE_ENV !== 'production') {

        throw error;
      }
    })
  }
}

export const RESET = '@@requests/RESET'
export function handleReset(request) {
  const action = {
    type: RESET,
    key: request.key
  }
  return action;
}
