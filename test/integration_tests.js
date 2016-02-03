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
process.env.MONGOLAB_URI = 'mongodb://localhost:/profile_test_integration';

var HOST = 'localhost:3000';

describe('Authentication: The server...' , () => {

  describe('Receiving a POST request' , () => {
  //Close database and server instances when the tests are done
    after( (done) => {
      mongoose.connection.db.dropDatabase( () => {} );
      done();
    });

    it('should receive a cookie confirmation after creating a user' , (done) => {

      var testProfilePost = {
        username: 'testProfile',
        email: 'email@test.com',
        password: 'testword'
      };
      request(HOST)
        .post('/signup')
        .send(JSON.stringify(testProfilePost))
        .end( (err ,res) => {
          expect( JSON.stringify(res.body) ).to.eql( '{"msg":"finished"}' );
          done();
        });
    });
  });

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
    it('should let you log in.' , (done) => {
      request(HOST)
        .get('/signin')
        .auth('uniqueGetName', 'testpassword')
        .end( (err , res) => {
          expect( JSON.stringify(res.body) ).to.eql(JSON.stringify( {msg: 'Successful Login'} ));
          done();
      });
    });
  });

});//End of describe
