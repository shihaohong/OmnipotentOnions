const assert = require('assert');
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

//
describe('Profile API', function() {
  beforeEach(function(done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function(done) {
    dbUtils.rollback(done);
  });

  it('accepts GET request to /profiles', function(done) {
    request(app)
      .get('/profiles')
      .expect(res => {
        console.log(res.body);
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 1
      })
      .end(done);
  });

  it('seds 404 if id on GET request to /profile does not exist', function(done) {
    request(app)
      .get('/profil')
      .expect(404)
      .end(done);
  });

  it('accepts GET requests to /profiles/:id', function (done) {
    request(app)
      .get('/profiles/1')
      .expect(res => {
        console.log(res.body);
        res.body = {
          id: res.body.id,
          created_at: !!Date.parse(res.body.created_at)
        };
      })
      .expect(200, {
        id: 1,
        created_at: true
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /profile/:id does not exist', function (done) {
    request(app)
      .get('/profiles/123')
      .expect(404)
      .end(done);
  });

  it('accepts POST requests to /profiles/:id', function (done) {
    request(app)
      .post('/profiles/1')
      .query({
        bio: 'I am an onion',
        nickname: 'Onion'
      })
      .expect(res => {
        console.log('res.body in test ', res.body);
        res.body = {
          aboutMe: res.body.aboutMe,
          nickname: res.body.nickname
        };
      })
      .expect(201, {
        aboutMe: 'I am an onion',
        nickname: 'Onion'
      })
      .end(done);
  });

  it('sends 404 if id on POST requests to /profile/:id does not exist', function (done) {
    request(app)
      .post('/profiles/123')
      .query({
        bio: 'I am an onion',
        nickname: 'Onion'
      })
      .expect(404)
      .end(done);
  });
});