'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserGroupss = getUserGroupss;
exports.getUserGroupsByKey = getUserGroupsByKey;
exports.postUserGroups = postUserGroups;
exports.patchUserGroupsByKey = patchUserGroupsByKey;
exports.deleteUserGroupsByKey = deleteUserGroupsByKey;

var _config = require('../../../config/config.js');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserGroupss(req, res, next) {

  _models.UserGroups.findAll().then(function (UserGroupss) {
    res.json(UserGroupss);
  }).catch(function (error) {
    next(error);
  });
}

function getUserGroupsByKey(req, res, next) {
  var key = req.swagger.params.userGroupKey.value;
  _models.UserGroups.findOne({ where: { key: { $ilike: key } } }).then(function (booth) {
    res.json(booth);
  }).catch(function (error) {
    next(error);
  });
}

function postUserGroups(req, res, next) {
  var body = req.swagger.params.body.value;
  console.log(body);
  console.log(_models.UserGroups);

  _models.UserGroups.create(body).then(function (booth) {
    res.json(booth);
  }).catch(function (error) {
    next(error);
  });
}

function patchUserGroupsByKey(req, res, next) {
  var key = req.swagger.params.userGroupKey.value;
  var body = req.swagger.params.body.value;

  _models.UserGroups.findOne({ where: { key: { $ilike: key } } }).then(function (booth) {
    if (!booth) {
      res.status(404);
      throw new Error('UserGroups not found');
    }
    return _models.UserGroups.update(body);
  }).then(function (field) {
    res.json(field);
  }).catch(function (error) {
    next(error);
  });
}

function deleteUserGroupsByKey(req, res, next) {
  var key = req.swagger.params.userGroupKey.value;

  _models.UserGroups.findOne({ where: { key: { $ilike: key } } }).then(function (booth) {
    if (!booth) {
      res.status(404);
      throw new Error('UserGroups not found');
    }
    return _models.UserGroups.destroy();
  }).then(function () {
    res.status(200).json();
  }).catch(function (error) {
    next(error);
  });
}