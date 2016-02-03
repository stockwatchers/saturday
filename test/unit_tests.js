//Testing modules

const chai = require('chai').use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;
const handleError = require( __dirname + '/../lib/handle_db_error');
const server = require( __dirname + '/../server');

//Model to test
const Profile = require( __dirname + '/../models/profile');
//DB Settings
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost:/profile_test_unit';

var HOST = 'localhost:3000';

describe('Authentication: The server...' , () => {
  describe('Receiving a POST request' , () => {
  //Close database and server instances when the tests are done
    after( (done) => {
      mongoose.connection.db.dropDatabase( () => {} );
      done();
    });

    it('should throw a invalid name or password error' , (done) => {

      var testProfilePost = {
        username: 'short',
        email: 'emailshort@test.com',
        password: 'short'
      };

      request(HOST)
        .post('/signup')
        .send(JSON.stringify(testProfilePost))
        .end( (err , res) => {
          expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'Invalid username or password'} ));
          done();
        });
    });

    describe('Database Verification' , () => {
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
  describe('GET requests should' , () => {
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

    it('should throw errors if no user' , (done) => {
      request(HOST)
        .get('/signin')
        .auth('Warren Buffet' , 'testpassword')
        .end( (err , res) => {
          expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'NONE SHALL PASS!'} ));
          done();
        });
      });

    it('should throw errors if passwords do not match' , (done) => {
      request(HOST)
        .get('/signin')
        .auth('uniqueGetName' , 'wrongpassword')
        .end( (err , res) => {
          expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'Password Mismatch'} ));
          done();
        });
    });
  });

});//End of describe
