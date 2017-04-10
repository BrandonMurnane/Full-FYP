'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategories = getCategories;
exports.getCategoryByKey = getCategoryByKey;
exports.postCategory = postCategory;
exports.patchCategoryByKey = patchCategoryByKey;
exports.deleteCategoryByKey = deleteCategoryByKey;

var _config = require('../../../config/config.js');

var _config2 = _interopRequireDefault(_config);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCategories(req, res, next) {

  _models.Category.findAll().then(function (Categorys) {
    res.json(Categorys);
  }).catch(function (error) {
    next(error);
  });
}

function getCategoryByKey(req, res, next) {
  var key = req.swagger.params.categoryKey.value;
  _models.Category.findOne({ where: { key: { $ilike: key } } }).then(function (category) {
    res.json(category);
  }).catch(function (error) {
    next(error);
  });
}

function postCategory(req, res, next) {
  var body = req.swagger.params.body.value;

  _models.Category.create(body).then(function (category) {
    res.json(category);
  }).catch(function (error) {
    next(error);
  });
}

function patchCategoryByKey(req, res, next) {
  var key = req.swagger.params.categoryKey.value;
  var body = req.swagger.params.body.value;

  _models.Category.findOne({ where: { key: { $ilike: key } } }).then(function (category) {
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
    return category.update(body);
  }).then(function (category) {
    res.json(category);
  }).catch(function (error) {
    next(error);
  });
}

function deleteCategoryByKey(req, res, next) {
  var key = req.swagger.params.categoryKey.value;

  _models.Category.findOne({ where: { key: { $ilike: key } } }).then(function (category) {
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
    return category.destroy();
  }).then(function () {
    res.status(200).json();
  }).catch(function (error) {
    next(error);
  });
}