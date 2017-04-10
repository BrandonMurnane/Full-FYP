'use strict';
import nunjucks from 'nunjucks';

import { User, } from '../../models';

/**
* GET /users
*
* Finds zero or more users
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
export function getUsers(req, res, next) {
  User.findAll()
    .then((Users) => {
      res.json(Users);
    })
    .catch((error) => {
      next(error);
    });
}

/**
* DELETE /users/{Username}
*
* Deletes the user
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
export function deleteUserByUsername(req, res, next) {
  const username = req.swagger.params.username.value;

  User.findOne({ where: { username: username } })
  .then(function(user){
    if (!user) {
      res.status(404);
      throw new Error('User Not found');
    }
    return user.destroy();
  })
  .then(function(){
    res.json(user);
  })
  .catch(function(error){
    next(error);
  });
}

/**
* GET /users/{Username}
*
* Retrieves the user
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
export function getUserByUsername(req, res, next) {
  const username = req.swagger.params.username.value;
  const password = req.swagger.params.password.value;

  User.findOne({ where: { username: username }  })
  .then(function(user) {
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.comparePassword(password)
    .then((compareResult) => {
      if (compareResult) res.json(user);
      throw new Error('Wrong Password');
    });
  })
  .catch(function(error){
    next(error);
  });
}

/**
* PATCH /users/{Username}
*
* Updates the user. PATCH will only
* update the attributes of the user provided in the body of the request.
* Other attributes will not be updated.
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
export function patchUserByUsername(req, res, next) {
  const username = req.swagger.params.username.value;
  const body = req.swagger.params.body.value;

  User.findOne({ where: { username: username } })
  .then(function(user){
    if (!user) {
      res.status(404);
      throw new Error('User Not found');
    }
    return user.update(body);
  })
  .then(function(user){
    res.json(user);
  })
  .catch(function(error){
    next(error);
  });
}

/**
* POST /users
*
* Creates a new user
*
* @param {IncomingMessage} req - The request object
* @param {ServerResponse} res - The response object
* @param {Function} next - The next middleware function in the stack
*/
export function postUser(req, res, next) {
  const body = req.swagger.params.body.value;

  User.create(body)
  .then((user) => {
    res.json(user);
  })
  .catch((error) => {
    next(error);
  });
}
