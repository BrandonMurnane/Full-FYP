'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroups = getUserGroups;
exports.getUserGroupByKey = getUserGroupByKey;
exports.postUserGroup = postUserGroup;
exports.patchUserGroupByKey = patchUserGroupByKey;
exports.deleteUserGroupByKey = deleteUserGroupByKey;

var _config = require('../../../config/config.js');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserGroups(req, res, next) {

  _models.UserGroups.findAll().then(function (UserGroups) {
    res.json(UserGroups);
  }).catch(function (error) {
    next(error);
  });
}

function getUserGroupByKey(req, res, next) {
  var key = req.swagger.params.userGroupKey.value;
  _models.UserGroups.findOne({ where: { key: { $ilike: key } } }).then(function (userGroup) {
    if (!userGroup) {
      res.status(404);
      throw new Error('UserGroups not found');
    }
    res.json(userGroup);
  }).catch(function (error) {
    next(error);
  });
}

function postUserGroup(req, res, next) {
  var body = req.swagger.params.body.value;

  _models.UserGroups.create(body).then(function (userGroup) {
    res.json(userGroup);
  }).catch(function (error) {
    next(error);
  });
}

function patchUserGroupByKey(req, res, next) {
  var key = req.swagger.params.userGroupKey.value;
  var body = req.swagger.params.body.value;

  _models.UserGroups.findOne({ where: { key: { $ilike: key } } }).then(function (userGroup) {
    if (!userGroup) {
      res.status(404);
      throw new Error('UserGroups not found');
    }
    return userGroup.update(body);
  }).then(function (userGroup) {
    res.json(userGroup);
  }).catch(function (error) {
    next(error);
  });
}

function deleteUserGroupByKey(req, res, next) {
  var key = req.swagger.params.userGroupKey.value;

  _models.UserGroups.findOne({ where: { key: { $ilike: key } } }).then(function (userGroup) {
    if (!userGroup) {
      res.status(404);
      throw new Error('UserGroups not found');
    }
    return userGroup.destroy();
  }).then(function () {
    res.status(200).json();
  }).catch(function (error) {
    next(error);
  });
}