'use strict';
import config from '../../../config/config.js';
import moment from 'moment';
import _ from 'lodash';

import {Events,Category } from '../../models';


export function getEvents(req, res, next) {
// parse optional query parameters
  const CategoryParam = req.swagger.params.category.value

  const queryObj = {
    include: [{
      model: Category,
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
  Events.findAll(queryObj)
  .then((event) => {
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json(event);
  })
  .catch((error) => {
    next(error);
  });
}


export function getEventByKey(req, res, next) {
  const key = req.swagger.params.eventKey.value;
  Events.findOne({ where: { key: { $ilike: key } } })
  .then((event) => {
    res.json(event);
  })
  .catch((error) => {
    next(error);
  });
}


export function postEvent(req, res, next) {
  const body = req.swagger.params.body.value;

  Events.create(body)
  .then((event) => {
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    res.json(event);
  })
  .catch((error) => {
    next(error);
  });
}

export function patchEventByKey(req, res, next) {
  const key = req.swagger.params.eventKey.value;
  const body = req.swagger.params.body.value;

  Events.findOne({ where: { key: { $ilike: key } } })
  .then((event) => {
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    return event.update(body);
  })
  .then((event) => {
    res.json(event);
  })
  .catch((error) => {
    next(error);
  });
}

export function deleteEventByKey(req, res, next) {
  const key = req.swagger.params.eventKey.value;

  Events.findOne({ where: { key: { $ilike: key } } })
  .then((event) => {
    if (!event) {
      res.status(404);
      throw new Error('Event not found');
    }
    return event.destroy();
  })
  .then(() => {
    res.status(200).json();
  })
  .catch((error) => {
    next(error);
  });
}
