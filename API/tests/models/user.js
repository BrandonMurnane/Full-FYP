'use strict';
import chai, { expect } from 'chai';
import bcrypt from 'bcryptjs';

import { User, Category, UserGroup } from '../../src/models/';

describe('User Model', function() {
  let user;

  before('Builds model', function(done) {
    return User.create({
      username: 'unit',
      password: 'test',
      email: 'test@gmail.com',
      name: 'Unit Test User'
    })
    .then(function(createdUser){
      user = createdUser;
      done();
    })
    .catch(function(error){
      done(error);
    });
  });

  it('Has username', function() {
    expect(user.username).to.equal('unit');
  });

  it('Has hashed password that can be compared', function(){
    expect(bcrypt.comparePassword('test').to.be.true;
  });

  it('Has email', function() {
    expect(user.email).to.equal('test@gmail.com');
  });

  it('Has name', function() {
    expect(user.name).to.equal('Unit Test User');
  });
});
