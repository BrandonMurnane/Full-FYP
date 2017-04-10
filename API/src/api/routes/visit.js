'use strict';
import config from '../../../config/config.js';
import moment from 'moment';
import _ from 'lodash';

import {Visit, Booth, Events } from '../../models';


export function getVisits(req, res, next) {
// parse optional query parameters
  const BoothParam = req.swagger.params.booth.value;
  const EventParam = req.swagger.params.event.value

  const queryObj = {};

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


  Visit.findAll(queryObj)
  .then((Visits) => {
    res.json(Visits);
  })
  .catch((error) => {
    next(error);
  });
}


export function getVisitById(req, res, next) {
  const visitId = req.swagger.params.visitId.value;

  Visit.findById(visitId)
  .then((visit) => {
    res.json(visit);
  })
  .catch((error) => {
    next(error);
  });
}


export function postVisit(req, res, next) {
  const body = req.swagger.params.body.value;

  Visit.create(body)
  .then((visit) => {
    res.json(visit);
  })
  .catch((error) => {
    next(error);
  });
}

export function patchVisitById(req, res, next) {
  const visitId = req.swagger.params.visitId.value;
  const body = req.swagger.params.body.value;

  Visit.findById(visitId)
  .then((visit) => {
    if (!visit) {
      res.status(404);
      throw new Error('Visit not found');
    }
    return visit.update(body);
  })
  .then((visit) => {
    res.json(visit);
  })
  .catch((error) => {
    next(error);
  });
}

export function deleteVisitById(req, res, next) {
  const visitId = req.swagger.params.visitId.value;

  Visit.findById(visitId)
  .then((visit) => {
    if (!visit) {
      res.status(404);
      throw new Error('Visit not found');
    }
    return visit.destroy();
  })
  .then(() => {
    res.status(200).json();
  })
  .catch((error) => {
    next(error);
  });
}
