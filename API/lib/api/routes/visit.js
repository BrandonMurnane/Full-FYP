'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisits = getVisits;
exports.getVisitById = getVisitById;
exports.postVisit = postVisit;
exports.patchVisitById = patchVisitById;
exports.deleteVisitById = deleteVisitById;

var _config = require('../../../config/config.js');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVisits(req, res, next) {
  // parse optional query parameters
  var BoothParam = req.swagger.params.booth.value;
  var EventParam = req.swagger.params.event.value;

  var queryObj = {};

  // add Booth filter
  if (BoothParam) {
    queryObj.where = {
      booth: {
        $iLike: BoothParam
      }
    };
  }
  // add Event filter
  if (EventParam) {
    queryObj.where = {
      event: {
        $iLike: EventParam
      }
    };
  }

  _models.Visit.findAll(queryObj).then(function (Visits) {
    res.json(Visits);
  }).catch(function (error) {
    next(error);
  });
}

function getVisitById(req, res, next) {
  var visitId = req.swagger.params.visitId.value;
  _models.Visit.findById(visitId).then(function (visit) {
    res.json(visit);
  }).catch(function (error) {
    next(error);
  });
}

function postVisit(req, res, next) {
  var body = req.swagger.params.body.value;

  _models.Visit.create(body).then(function (visit) {
    res.json(visit);
  }).catch(function (error) {
    next(error);
  });
}

function patchVisitById(req, res, next) {
  var visitId = req.swagger.params.visitId.value;
  var body = req.swagger.params.body.value;

  _models.Visit.findById(visitId).then(function (visit) {
    if (!visit) {
      res.status(404);
      throw new Error('Visit not found');
    }
    return visit.update(body);
  }).then(function (visit) {
    res.json(visit);
  }).catch(function (error) {
    next(error);
  });
}

function deleteVisitById(req, res, next) {
  var visitId = req.swagger.params.visitId.value;

  _models.Visit.ffindById(visitId).then(function (visit) {
    if (!visit) {
      res.status(404);
      throw new Error('Visit not found');
    }
    return visit.destroy();
  }).then(function () {
    res.status(200).json();
  }).catch(function (error) {
    next(error);
  });
}