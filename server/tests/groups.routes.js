const assert = require('assert');
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Groups API', function() {
  beforeEach(function(done) {
    dbUtils.rollbackMigrate(done);
  });

  // afterEach(function(done) {
  //   dbUtils.rollback(done);
  // });

  //the reason why id is 1 here is because it present the 1 from profile_id
  //the group will associate it with that, if you make it 2, that would cause a foriegn key problem
  //the id we return is not from profile, but the ID of the groups

  //the reason why id is 1 here is because it present the 1 from profile_id
  //the group will associate it with that, if you make it 2, that would cause a foriegn key problem
  //the id we return is not from profile, but the ID of the groups

  it('post to groups', function(done) {
    request(app)
      .post('/groups/createGroup/genericName')
      .query({
        id: 1,
        shortID: '123JAS'
      })
      .expect(res => {
        res.body = {
          id: res.body[0].groups.id,
          shortID: res.body[0].groups.shortID
        };
      }).expect(201, {
        id: 2,
        shortID: '123JAS'
      })
      .end(done);
  }); 

  it('gets 404 when incorrect URL', function(done) {
    request(app)
      .post('/groups/createGrou/1234')
      .query({
        id: 1,
        shortID: 123
      })
      .expect(404)
      .end(done);
  });

  it('get to groups', function(done) {
    request(app)
      .get('/groups/fetchOneGroup/1')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200)
      .end(done);
  });

  it('404 on GET request when the groupid does not exist', function(done) {
    request(app)
      .get('/groups/fetchOneGroup/2123')
      .expect(404)
      .end(done);
  });
});