'use strict';
import chai, { expect } from 'chai';
import bcrypt from 'bcryptjs';

import { UserGroup } from '../../src/models/';

describe('UserGroup Model', function() {
  let userGroup;

  before('Builds model', function(done) {
    return UserGroup.create({
      key: 'unit',
      description: 'Unit Test UserGroup'
    })
    .then(function(createdUserGroup){
      userGroup = createdUserGroup;
      done();
    })
    .catch(function(error){
      done(error);
    });
  });

  it('Has userGroup key', function() {
    expect(userGroup.key).to.equal('unit');
  });

  it('Has description', function() {
    expect(userGroup.description).to.equal('Unit Test UserGroup');
  });
});