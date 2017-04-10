'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEvents = getEvents;
exports.getEventByKey = getEventByKey;
exports.postEvent = postEvent;
exports.patchEventByKey = patchEventByKey;
exports.deleteEventByKey = deleteEventByKey;

var _config = require('../../../config/config.js');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEvents(req, res, next) {
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
  _models.Events.findAll(queryObj).then(function (event) {
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json(event);
  }).catch(function (error) {
    next(error);
  });
}

function getEventByKey(req, res, next) {
  var key = req.swagger.params.eventKey.value;
  _models.Events.findOne({ where: { key: { $ilike: key } } }).then(function (event) {
    res.json(event);
  }).catch(function (error) {
    next(error);
  });
}

function postEvent(req, res, next) {
  var body = req.swagger.params.body.value;

  _models.Events.create(body).then(function (event) {
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json(event);
  }).catch(function (error) {
    next(error);
  });
}

function patchEventByKey(req, res, next) {
  var key = req.swagger.params.eventKey.value;
  var body = req.swagger.params.body.value;

  _models.Events.findOne({ where: { key: { $ilike: key } } }).then(function (event) {
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    return event.update(body);
  }).then(function (event) {
    res.json(event);
  }).catch(function (error) {
    next(error);
  });
}

function deleteEventByKey(req, res, next) {
  var key = req.swagger.params.eventKey.value;

  _models.Events.findOne({ where: { key: { $ilike: key } } }).then(function (event) {
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    return event.destroy();
  }).then(function () {
    res.status(200).json();
  }).catch(function (error) {
    next(error);
  });
}