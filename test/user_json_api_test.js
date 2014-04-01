'use strict';
//jshint unused:false

process.env.NODE_TLS_REJECT_UNAUTHORIZED=0;
var superagent = require('superagent');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
var app = require('../server').app;
var PORT = process.env.PORT || 3000;
var appURL = 'https://localhost:' + PORT;


describe('Users JSON api', function(){
  var id;

  it('can create a new user', function(done){
    superagent.post(appURL +'/api/v1/users')
      .send(
        {
        first_name: 'Ford',
        last_name: 'Prefect',
        local: {
          email: 'fordp@example.com',
          password: 'valid_password'
        },
      })
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body._id).to.not.be.eql(null);
        expect(res.body.first_name).to.be.eql('Ford');
        expect(res.body.last_name).to.be.eql('Prefect');
        id = res.body._id;

        done();
      });
  });

  it('can get users collection', function(done){
    superagent.get(appURL + '/api/v1/users').end(function(e, res){
      expect(e).to.eql(null);
      expect(res.body.length).to.be.above(0);

      done();
    });
  });

  it('can get a single user', function(done){
    superagent.get(appURL + '/api/v1/users/' + id).end(function(e, res){
      expect(e).to.eql(null);
      expect(res.body._id).to.be.eql(id);
      expect(res.body.first_name).to.be.eql('Ford');
      expect(res.body.last_name).to.be.eql('Prefect');

      done();
    });
  });

  it('does not reveal the password hash for a user', function(done) {
    superagent.get(appURL + '/api/v1/users/' + id).end(function(e, res){
      if (res.body.local) {
        expect(res.body.local.password).to.eql('[FILTERED]');
      }
      done();
    });
  });

  it('does not reveal the password hash for list of users', function(done) {
    superagent.get(appURL + '/api/v1/users').end(function(e, res){
      if (res.body.local) {
        expect(res.body.local.password).to.eql('[FILTERED]');
      }
      done();
    });
  });

  it('can update a user', function(done){
    superagent.put(appURL + '/api/v1/users/' + id).send({first_name: 'Arthur', last_name: 'Dent'})
    .end(function(e,res){
      expect(e).to.eql(null);
      expect(res.body.msg).to.be.eql('success');

      done();
    });
  });

  it('can delete a user' , function(done){
    superagent.del(appURL + '/api/v1/users/' + id).end(function(e,res){
      expect(e).to.eql(null);
      expect(res.body.msg).to.be.eql('success');

      done();
    });
  });
});
