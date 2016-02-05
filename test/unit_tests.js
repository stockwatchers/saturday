//Testing modules

const chai = require('chai').use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;
const server = require( __dirname + '/../server');
const jwt = require('jsonwebtoken');
const express = require('express');

//Model to test
const Profile = require( __dirname + '/../models/user');
//DB Settings
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost:/profile_test_unit';

var HOST = 'localhost:3000';

describe('Unit Tests:' , () => {

  after( (done) => {
    mongoose.connection.db.dropDatabase( () => {} );
    done();
  });
  //creating a test user
  before( (done) => {
    request(HOST)
      .post('/signup')
      .send(JSON.stringify({
        username: 'testProfile',
        email: 'email@test.com',
        password: 'testword'
      }))
      .end( (err ,res) => {
        expect( res.status ).to.eql(200);
        done();
      });
  });

  describe('POSTing to /signup' , () => {

    it('should throw a invalid name or password error' , (done) => {
      var testProfilePost = {
        username: '',
        email: 'emailshort@test.com',
        password: ''
      };
      request(HOST)
        .post('/signup')
        .send(testProfilePost)
        .end( (err , res) => {
          expect(res.status).to.eql(400);
          expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'Invalid username or password'} ));
          done();
        });
    });

    describe('Verifying a DB Profile' , () => {
      //Making it easy to set up a test profile
      var dummyProfile;
      //Create an entry
      before( (done) => {
        var testProfile = new Profile();
        testProfile.username = "uniqueTestName";
        testProfile.authentication.email = "testmail@mail.com";
        testProfile.hashPassword("testpassword");
        testProfile.save( (err , data) => {
          if (err) return console.log('Error on creating test profile');
          done();
        });
      });
      //Create a test account
      beforeEach( (done) => {
        dummyProfile = {
          username: 'testProfile',
          email: 'email1@test.com',
          password: 'testword'
        };
        done();
      });

      it('should throw an error if email is taken' , (done) => {

        dummyProfile.email = "testmail@mail.com";
        request(HOST)
          .post('/signup')
          .send(JSON.stringify(dummyProfile))
          .end( (err , res) => {
            expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'Account exists on this email'} ));
            done();
          });
      });

      it('should throw an error if the username is taken' , (done) => {

        dummyProfile.username = 'uniqueTestName';
        request(HOST)
          .post('/signup')
          .send( JSON.stringify(dummyProfile) )
          .end( (err , res) => {
            expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'Username already exists'} ));
            done();
          });
      });
    });//Ensd of nested describe
  });//End of POST to /signup

  describe('POSTing to /signin should' , () => {
    before( (done) => {
      var getProfile = new Profile();
      getProfile.username = "uniqueGetName";
      getProfile.authentication.email = "getmail@mail.com";
      getProfile.hashPassword("testpassword");
      getProfile.save( (err , data) => {
        if (err) return console.log('Error on creating test profile');
        done();
      });
    });

    it('throw errors if no user' , (done) => {
      request(HOST)
        .post('/signin')
        .send({})
        .end( (err , res) => {
          expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'NONE SHALL PASS!'} ));
          done();
        });
      });

    it('throw errors if passwords do not match' , (done) => {

      var dumbestProfile = {
        username: 'uniqueGetName',
        email: 'email1@test.com',
        password: 'wrongpass'
      };
      request(HOST)
        .post('/signin')
        .send( JSON.stringify(dumbestProfile) )
        .end( (err , res) => {
          expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'Password Mismatch'} ));
          done();
        });
    });
  });

  describe('POSTING to /validateToken' , () => {

    before( (done) => {
      var getProfile = new Profile();
      getProfile.username = "tokenVal";
      getProfile.authentication.email = "tokenVal@mail.com";
      getProfile.hashPassword("testpassword");
      getProfile.save( (err , data) => {
        if (err) return console.log('Error on creating test profile');
        console.log('Created tokenVal');
        done();
      });

    });

    it('should throw error if the token is bad' , (done) =>{

      request(HOST)
        .post('/validateToken')
        .send('')
        .end( (err, res) => {
          console.log('Cannot decode token')
          expect(res.status).to.eql(401);
          done();
        });
    });
    it('should throw error if token does not match DB' , (done) =>{

      var testAuth = {};
      Profile.find( {'username': 'testProfile'} , (err , profiles) =>{
        testAuth.authentication = profiles[0].authentication;
        testAuth._id = '123456789';
        testAuth.username = profiles[0].username;

        var token = jwt.sign(testAuth , 'changethis');

        request(HOST)
          .post('/validateToken')
          .send(token)
          .end( (err, res) => {
            console.log('Cannot find user');
            expect(res.status).to.eql(401);
            done();
        });
      });

    });
  });


});//End of describe
