//Testing modules

const chai = require('chai').use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;
const server = require( __dirname + '/../server');
const jwt = require('jsonwebtoken');

//Model to test
const Profile = require( __dirname + '/../models/user');
//DB Settings
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost:/profile_test_integration';

var HOST = 'localhost:3000';

describe('Integration Tests' , () => {

  after( (done) => {
    mongoose.connection.db.dropDatabase( () => {} );
    done();
  });

  describe('POSTing to /signup should' , () => {
    it('let you create a new user' , (done) => {
    var testProfilePost = {
      username: 'testProfile',
      email: 'email@test.com',
      password: 'testword'
    };
    request(HOST)
      .post('/signup')
      .send(JSON.stringify(testProfilePost))
      .end( (err ,res) => {
        expect( res.status ).to.eql(200);
        done();
      });
    });
  });

  describe('POSTing to /signin should ' , () => {
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
    it('let you log in with valid credentials.' , (done) => {
      request(HOST)
        .post('/signin')
        .send('{"username":"uniqueGetName" , "password":"testpassword"}')
        .end( (err , res) => {
          expect(res.status).to.eql(200);
          done();
      });
    });
  });

  describe('POSTING to /validateToken' , () => {

    var hashedPass;

    before( (done) => {
      var testProfile = new Profile();
      hashedPass = testProfile.hashPassword('testword');
      done();
    });

    it('should be happy with good credentials' , (done) =>{

      var tokenObj = {};
      Profile.find( {'username': 'testProfile'} , (err , profiles) =>{

        tokenObj.authentication = profiles[0].authentication;
        tokenObj.username = profiles[0].username;
        tokenObj._id = profiles[0]._id;

        var token = jwt.sign(tokenObj , 'changethis');

        request(HOST)
          .post('/validateToken')
          .send(token)
          .end( (err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });

  });
  });
});//End of describe
