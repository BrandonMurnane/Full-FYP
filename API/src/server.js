'use strict';

import express from 'express';
import session from 'express-session';

import bodyParser from 'body-parser';

import JsonRefs from 'json-refs';
import swaggerTools from 'swagger-tools';

import util from 'util';
import yaml from 'js-yaml';
import fs from 'fs';

import passport from 'passport';

import config from '../config/config';
import path from 'path';

import _ from 'lodash';


//Deployment type
const nodeEnv = process.env.NODE_ENV || 'development';
var isSSLRedirectEnabled = (process.env.SSL_REDIRECT == 'true');


// swaggerRouter configuration
const routerOptions = {
  controllers: path.join(__dirname, 'api/routes'),
  useStubs: process.env.API_TYPE === 'development' ? true : false
  // Conditionally turn on stubs (mock mode)
};

const app = express();

// CORS option response
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Send-Notification');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json()); // for parsing application/json


app.get('/', function (req, res) {
  res.json({ Version: process.env.API_VERSION, baseUrl: '/v1' });
});


//Swagger Config
const swaggerFile = './src/api/specs/status.yaml';
const swaggerString = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDoc = yaml.safeLoad(swaggerString);


// wrap swagger initialization with promise
function initializeSwaggerMiddleware(swaggerSpec) {
  return new Promise((resolve, reject) => {
    // return intialized middleware through resolve
    // No reject() needed b/c initializeMiddleware kills the node process it if errors
    swaggerTools.initializeMiddleware(swaggerSpec, resolve);
  });
}

const refoptions = {
  loaderOptions: {
    processContent: function (res, callback) {
      callback(undefined, yaml.safeLoad(res.text));
    }
  }
};

app.ready = JsonRefs.resolveRefsAt(swaggerFile, refoptions)
.then((result) => {
  const swaggerSpect = result.resolved;
  return initializeSwaggerMiddleware(swaggerSpect)
})
.then((middleware) => {

  //Interpret Swagger resources and attach metadata to request
  //must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());


  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(routerOptions));

  //Swagger Docs
  app.use(middleware.swaggerUi({
    apiDocs: swaggerDoc.basePath, //UL to serve API Documetation JSON
    swaggerUi: swaggerDoc.basePath + '/docs', //URL to serve Swagger UI
    swaggerUiDir: './static/docs' //File Path for Swagger UI files
  }));

  //error handler
  app.use(function(err, req, res, next){
    //If no error is defined, pass to next middleware

    if (!util.isError(err)) { return next(); }
    //If no statusCode is set on res or it isn under 400, then tries
    //to find statusCode in context.response or context.error
    //Defaults to 500
    if (!res.statusCode || res.statusCode < 400) {

      //Gets status code from
      if (err && err.statusCode && err.statusCode >= 400) {
        res.statusCode = err.statusCode;
      } else {
        res.statusCode = 500;
      }
    }

    const errorMessage = { message: err.message };


    //If a 400 error and fail schema, then add validation errors to message
    if(err.code === 'SCHEMA_VALIDATION_FAILED') {
      res.statusCode = 400;
      errorMessage.validationErrors = err.results.errors;
      err.results.errors.forEach(function(validationErrors){
        errorMessage.validationErrors.push(validationErrors);
      });
    }

    //If SequelizeValidationError then return 400 error
    if(err.name === 'SequelizeValidationError'  || err.name === 'SequelizeForeignKeyConstraintError') {
      res.statusCode = 400;
      errorMessage.validationErrors = err.errors;
    }
    console.log('ERROR', err);
    res.json(errorMessage);
  });


  // returns self if initializatin is completed
  return app;
})
.catch((error) => {
  console.error('Start up failed');
  console.error(error);
  console.error(error.stack);
  process.exit(1);
})

module.exports = app;
