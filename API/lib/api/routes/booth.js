'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBooths = getBooths;
exports.getBoothByKey = getBoothByKey;
exports.postBooth = postBooth;
exports.patchBoothByKey = patchBoothByKey;
exports.deleteBoothByKey = deleteBoothByKey;

var _config = require('../../../config/config.js');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBooths(req, res, next) {
  // parse optional query parameters
  var CategoryParam = req.swagger.params.category.value;

  var queryObj = {
    include: [{
      model: _models.Category,
      attributes: ['key'],
      through: {
        attributes: []
      }
    }]
  };

  // add Category filter
  if (CategoryParam) {
    queryObj.include[0].where = {
      key: {
        $iLike: CategoryParam
      }
    };
  }

  // find all Booths based on queryObj
  _models.Booth.findAll(queryObj).then(function (Booths) {
    res.json(Booths);
  }).catch(function (error) {
    next(error);
  });
}

function getBoothByKey(req, res, next) {
  var key = req.swagger.params.boothKey.value;
  _models.Booth.findOne({ where: { key: { $ilike: key } } }).then(function (booth) {
    if (!booth) {
      res.status(404);
      throw new Error('Booth not found');
    }
    res.json(booth);
  }).catch(function (error) {
    next(error);
  });
}

function postBooth(req, res, next) {
  var body = req.swagger.params.body.value;

  _models.Booth.create(body).then(function (booth) {
    res.json(booth);
  }).catch(function (error) {
    next(error);
  });
}

function patchBoothByKey(req, res, next) {
  var key = req.swagger.params.boothKey.value;
  var body = req.swagger.params.body.value;

  _models.Booth.findOne({ where: { key: { $ilike: key } } }).then(function (booth) {
    if (!booth) {
      res.status(404);
      throw new Error('Booth not found');
    }
    return booth.update(body);
  }).then(function (field) {
    res.json(field);
  }).catch(function (error) {
    next(error);
  });
}

function deleteBoothByKey(req, res, next) {
  var key = req.swagger.params.boothKey.value;

  _models.Booth.findOne({ where: { key: { $ilike: key } } }).then(function (booth) {
    if (!booth) {
      res.status(404);
      throw new Error('Booth not found');
    }
    return booth.destroy();
  }).then(function () {
    res.status(200).json();
  }).catch(function (error) {
    next(error);
  });
}