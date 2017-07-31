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
        id: 1,
        shortID: '123JAS'
      })
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
});