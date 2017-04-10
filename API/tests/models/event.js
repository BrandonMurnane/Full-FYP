'use strict';
import chai, { expect } from 'chai';
import bcrypt from 'bcryptjs';

import { Event, Category } from '../../src/models/';
describe('Event Model', function() {
  let event;

  before('Builds model', function(done) {
    return Event.create({
      key: 'unit',
      speaker: 'test',
      description: 'Unit Test Event'
    })
    .then(function(createdEvent){
      event = createdEvent;
      done();
    })
    .catch(function(error){
      done(error);
    });
  });

  it('Has event key', function() {
    expect(event.key).to.equal('unit');
  });

  it('Has speaker', function() {
    expect(event.speaker).to.equal('test');
  });

  it('Has description', function() {
    expect(event.description).to.equal('Unit Test Event');
  });
});