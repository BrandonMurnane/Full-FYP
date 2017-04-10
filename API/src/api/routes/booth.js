'use strict';
import config from '../../../config/config.js';
import moment from 'moment';
import _ from 'lodash';

import { Booth, Category } from '../../models';


export function getBooths(req, res, next) {
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
  Booth.findAll(queryObj)
  .then((Booths) => {
    res.json(Booths);
  })
  .catch((error) => {
    next(error);
  });
}


export function getBoothByKey(req, res, next) {
  const key = req.swagger.params.boothKey.value;
  Booth.findOne({ where: { key: { $ilike: key } } })
  .then((booth) => {
    if (!booth) {
      res.status(404);
      throw new Error('Booth not found');
    }
    res.json(booth);
  })
  .catch((error) => {
    next(error);
  });
}


export function postBooth(req, res, next) {
  const body = req.swagger.params.body.value;

  Booth.create(body)
  .then((booth) => {
    res.json(booth);
  })
  .catch((error) => {
    next(error);
  });
}

export function patchBoothByKey(req, res, next) {
  const key = req.swagger.params.boothKey.value;
  const body = req.swagger.params.body.value;

  Booth.findOne({ where: { key: { $ilike: key } } })
  .then((booth) => {
    if (!booth) {
      res.status(404);
      throw new Error('Booth not found');
    }
    return booth.update(body);
  })
  .then((field) => {
    res.json(field);
  })
  .catch((error) => {
    next(error);
  });
}

export function deleteBoothByKey(req, res, next) {
  const key = req.swagger.params.boothKey.value;

  Booth.findOne({ where: { key: { $ilike: key } } })
  .then((booth) => {
    if (!booth) {
      res.status(404);
      throw new Error('Booth not found');
    }
    return booth.destroy();
  })
  .then(() => {
    res.status(200).json();
  })
  .catch((error) => {
    next(error);
  });
}
