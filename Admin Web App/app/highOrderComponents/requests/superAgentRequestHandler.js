import _ from 'lodash';
import moment from 'moment';

const superagent = require('superagent');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

const API_URL = config.API_URL;
console.log(env)
console.log(config)
console.log(API_URL)


/**
 * Gets token for API requests authentication
 * Future development
 */
export function getToken() {
  return new Promise((resolve, reject) => {
  // implemented later
    resolve('token');
  });
}

/**
 * Converts datetime like values in response to moment objects.
 *
 * @param  {Object} object Response object
 */
function momentize(object) {
  return _.forEach(object, (value, key, collection) => {
    // if object or array then recursively scann
    if (typeof value === 'object') return momentize(value);

    // test string to see if valid date, if so, then replace
    // adding true makes moment use strict comparison
    const momentValue = moment(value, moment.ISO_8601, true);
    if (momentValue.isValid()) collection[key] = momentValue;
  });
}


/**
 * Perform request using super agent
 *
 * Assembles super agent request based on request object in state
 *
 * @param  {Object} request  Request state object
 * @return {Promise<Object>} Body response
 */
export function superAgentRequestHandler(request) {
  const { url, payload, headers } = request;
  const method = request.method || 'GET';


  return getToken()
  .then((token) => {
    const superagentRequest = superagent(method, API_URL + url);
    superagentRequest.set('Accept', 'application/json');

    if (headers) {
      _.forEach(headers, (value, key) => {
        superagentRequest.set(key, value);
      });
    }
    if (payload) {
      superagentRequest.send(payload);
    }

    return superagentRequest;
  })
  .then((response) => {
    return momentize(response.body);
  });
}
