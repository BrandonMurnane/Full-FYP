'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonRefs = require('json-refs');

var _jsonRefs2 = _interopRequireDefault(_jsonRefs);

var _swaggerTools = require('swagger-tools');

var _swaggerTools2 = _interopRequireDefault(_swaggerTools);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Deployment type
var nodeEnv = process.env.NODE_ENV || 'development';
var isSSLRedirectEnabled = process.env.SSL_REDIRECT == 'true';

// swaggerRouter configuration
var routerOptions = {
  controllers: _path2.default.join(__dirname, 'api/routes'),
  useStubs: process.env.API_TYPE === 'development' ? true : false
  // Conditionally turn on stubs (mock mode)
};

var app = (0, _express2.default)();

// CORS option response
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Send-Notification');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json()); // for parsing application/json


app.get('/', function (req, res) {
  res.json({ Version: process.env.API_VERSION, baseUrl: '/v1' });
});

//Swagger Config
var swaggerFile = './src/api/specs/status.yaml';
var swaggerString = _fs2.default.readFileSync(swaggerFile, 'utf8');
var swaggerDoc = _jsYaml2.default.safeLoad(swaggerString);

// wrap swagger initialization with promise
function initializeSwaggerMiddleware(swaggerSpec) {
  return new Promise(function (resolve, reject) {
    // return intialized middleware through resolve
    // No reject() needed b/c initializeMiddleware kills the node process it if errors
    _swaggerTools2.default.initializeMiddleware(swaggerSpec, resolve);
  });
}

var refoptions = {
  loaderOptions: {
    processContent: function processContent(res, callback) {
      callback(undefined, _jsYaml2.default.safeLoad(res.text));
    }
  }
};

app.ready = _jsonRefs2.default.resolveRefsAt(swaggerFile, refoptions).then(function (result) {
  var swaggerSpect = result.resolved;
  return initializeSwaggerMiddleware(swaggerSpect);
}).then(function (middleware) {

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
  app.use(function (err, req, res, next) {
    //If no error is defined, pass to next middleware

    if (!_util2.default.isError(err)) {
      return next();
    }
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

    var errorMessage = { message: err.message };

    //If a 400 error and fail schema, then add validation errors to message
    if (err.code === 'SCHEMA_VALIDATION_FAILED') {
      res.statusCode = 400;
      errorMessage.validationErrors = err.results.errors;
      err.results.errors.forEach(function (validationErrors) {
        errorMessage.validationErrors.push(validationErrors);
      });
    }

    //If SequelizeValidationError then return 400 error
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeForeignKeyConstraintError') {
      res.statusCode = 400;
      errorMessage.validationErrors = err.errors;
    }
    console.log('ERROR', err);
    res.json(errorMessage);
  });

  // returns self if initializatin is completed
  return app;
}).catch(function (error) {
  console.error('Start up failed');
  console.error(error);
  console.error(error.stack);
  process.exit(1);
});

module.exports = app;