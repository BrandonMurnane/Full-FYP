'use strict';
import chai, { expect } from 'chai';
import bcrypt from 'bcryptjs';

import { Booth, Category } from '../../src/models/';
describe('Booth Model', function() {
  let booth;

  before('Builds model', function(done) {
    return Booth.create({
      key: 'unit',
      owner: 'test',
      description: 'Unit Test Booth'
    })
    .then(function(createdBooth){
      booth = createdBooth;
      done();
    })
    .catch(function(error){
      done(error);
    });
  });

  it('Has booth key', function() {
    expect(booth.key).to.equal('unit');
  });

  it('Has owner', function() {
    expect(booth.owner).to.equal('test');
  });

  it('Has description', function() {
    expect(booth.description).to.equal('Unit Test Booth');
  });
});