'use strict';
import config from '../../../config/config.js';
import moment from 'moment';
import _ from 'lodash';

import {UserGroups } from '../../models';


export function getUserGroups(req, res, next) {

  UserGroups.findAll()
  .then((UserGroups) => {
    res.json(UserGroups);
  })
  .catch((error) => {
    next(error);
  });
}


export function getUserGroupByKey(req, res, next) {
  const key = req.swagger.params.userGroupKey.value;
  UserGroups.findOne({ where: { key: { $ilike: key } } })
  .then((userGroup) => {
    if (!userGroup) {
      res.status(404);
      throw new Error('UserGroups not found');
    }
    res.json(userGroup);
  })
  .catch((error) => {
    next(error);
  });
}


export function postUserGroup(req, res, next) {
  const body = req.swagger.params.body.value;

  UserGroups.create(body)
  .then((userGroup) => {
    res.json(userGroup);
  })
  .catch((error) => {
    next(error);
  });
}

export function patchUserGroupByKey(req, res, next) {
  const key = req.swagger.params.userGroupKey.value;
  const body = req.swagger.params.body.value;

  UserGroups.findOne({ where: { key: { $ilike: key } } })
  .then((userGroup) => {
    if (!userGroup) {
      res.status(404);
      throw new Error('UserGroups not found');
    }
    return userGroup.update(body);
  })
  .then((userGroup) => {
    res.json(userGroup);
  })
  .catch((error) => {
    next(error);
  });
}

export function deleteUserGroupByKey(req, res, next) {
  const key = req.swagger.params.userGroupKey.value;

  UserGroups.findOne({ where: { key: { $ilike: key } } })
  .then((userGroup) => {
    if (!userGroup) {
      res.status(404);
      throw new Error('UserGroups not found');
    }
    return userGroup.destroy();
  })
  .then(() => {
    res.status(200).json();
  })
  .catch((error) => {
    next(error);
  });
}
