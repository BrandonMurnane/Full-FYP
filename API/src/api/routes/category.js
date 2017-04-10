'use strict';
import config from '../../../config/config.js';
import moment from 'moment';
import _ from 'lodash';

import {Category } from '../../models';


export function getCategories(req, res, next) {

  Category.findAll()
  .then((Categorys) => {
    res.json(Categorys);
  })
  .catch((error) => {
    next(error);
  });
}


export function getCategoryByKey(req, res, next) {
  const key = req.swagger.params.categoryKey.value;
  Category.findOne({ where: { key: { $ilike: key } } })
  .then((category) => {
    res.json(category);
  })
  .catch((error) => {
    next(error);
  });
}


export function postCategory(req, res, next) {
  const body = req.swagger.params.body.value;

  Category.create(body)
  .then((category) => {
    res.json(category);
  })
  .catch((error) => {
    next(error);
  });
}

export function patchCategoryByKey(req, res, next) {
  const key = req.swagger.params.categoryKey.value;
  const body = req.swagger.params.body.value;

  Category.findOne({ where: { key: { $ilike: key } } })
  .then((category) => {
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
    return category.update(body);
  })
  .then((category) => {
    res.json(category);
  })
  .catch((error) => {
    next(error);
  });
}

export function deleteCategoryByKey(req, res, next) {
  const key = req.swagger.params.categoryKey.value;

  Category.findOne({ where: { key: { $ilike: key } } })
  .then((category) => {
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
    return category.destroy();
  })
  .then(() => {
    res.status(200).json();
  })
  .catch((error) => {
    next(error);
  });
}
