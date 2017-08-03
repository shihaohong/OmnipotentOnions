const assert = require('assert');
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Profile API', function() {
  beforeEach(function(done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function(done) {
    dbUtils.rollback(done);
  });
  
  it('accepts POST request to /events/:groupId', function(done) {
    var event = {
      eventName: 'Test Party',
      location: '944 Market St. San Francisco',
      creator: 1,
      startTime: '16:00',
      startDate: '2017-07-30',
      endTime: '22:00',
      endDate: '2017-07-30',
      detail: 'work pls'
    };
    request(app)
      .post('/events/1')
      .send(event)
      .expect(201,
        [{
          id: 2,
          eventName: 'Test Party',
          location: '944 Market St. San Francisco',
          creator: 1,
          startTime: '16:00',
          startDate: '2017-07-30',
          endTime: '22:00',
          endDate: '2017-07-30',
          detail: 'work pls',
          group_id: 1
        }]
      )
      .end(done);
  });
			
  it('accepts GET request to /events/:groupId', function(done) {
    request(app)
      .get('/events/1')
      .expect(200)
      .end(done);
  });

  it('accepts GET request to /:groupId/:eventId', function(done) {
    request(app)
      .get('/events/1/1')
      .expect(res => {
        length: res.body.length;
      })
      .expect(200, { id: 1,
        eventName: 'OmniChat Party',
        location: '944 Market St. San Francisco',
        startTime: '16:00',
        startDate: '2017-07-30',
        endTime: '22:00',
        endDate: '2017-07-30',
        detail: 'Ogres are like onions',
        group_id: null,
        creator: null })
      .end(done);
  });

});

