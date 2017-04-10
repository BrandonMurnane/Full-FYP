'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = getUsers;
exports.deleteUserByUsername = deleteUserByUsername;
exports.getUserByUsername = getUserByUsername;
exports.patchUserByUsername = patchUserByUsername;
exports.postUser = postUser;

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* GET /users
*
* Finds zero or more users
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
function getUsers(req, res, next) {
  _models.User.findAll().then(function (Users) {
    res.json(Users);
  }).catch(function (error) {
    next(error);
  });
}

/**
* DELETE /users/{Username}
*
* Deletes the user
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
function deleteUserByUsername(req, res, next) {
  var username = req.swagger.params.username.value;

  _models.User.findOne({ where: { username: username } }).then(function (user) {
    if (!user) {
      res.status(404);
      throw new Error('User Not found');
    }
    return user.destroy();
  }).then(function () {
    res.json(user);
  }).catch(function (error) {
    next(error);
  });
}

/**
* GET /users/{Username}
*
* Retrieves the user
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
function getUserByUsername(req, res, next) {
  var username = req.swagger.params.username.value;
  var password = req.swagger.params.password.value;

  _models.User.findOne({ where: { username: username } }).then(function (user) {
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.comparePassword(password).then(function (compareResult) {
      if (compareResult) res.json(user);
      throw new Error('Wrong Password');
    });
  }).catch(function (error) {
    next(error);
  });
}

/**
* PATCH /users/{Username}
*
* Updates the user. PATCH will only
* update the attributes of the user provided in the body of the request.
* Other attributes will not be updated.
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
function patchUserByUsername(req, res, next) {
  var username = req.swagger.params.username.value;
  var body = req.swagger.params.body.value;

  _models.User.findOne({ where: { username: username } }).then(function (user) {
    if (!user) {
      res.status(404);
      throw new Error('User Not found');
    }
    return user.update(body);
  }).then(function (user) {
    res.json(user);
  }).catch(function (error) {
    next(error);
  });
}

/**
* POST /users
*
* Creates a new user
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
function postUser(req, res, next) {
  var body = req.swagger.params.body.value;

  _models.User.create(body).then(function (user) {
    res.json(user);
  }).catch(function (error) {
    next(error);
  });
}