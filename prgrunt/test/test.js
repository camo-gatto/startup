// The Assert API covers the TDD assertion style.
var chai = require("chai"), chaiHttp = require('chai-http');
var assert = chai.assert;
var expect = chai.expect;
// The Expect / Should API covers the BDD assertion styles.
chai.use(chaiHttp);
chai.should();
var url = 'http://localhost:3000';
var app = require('../app.js').server;
// Add promise support if this does not exist natively.
if (!global.Promise) {
  var q = require('q');
  chai.request.addPromises(q.Promise);
}


var objToTest = {
    name: "camoscio"
};


describe('mocha', function() {
    it('should fail when asserting false', function() {
        false.should.equal(false);
    });
});

describe('#objToTest', function() {
    it('should be defined', function() {
        /*objToTest.should.not.equal(null);
        objToTest.should.not.equal(undefined);*/
        assert.isNotNull(objToTest);
        assert.isDefined(objToTest);
    });
    
    it('should have a property name', function() {
        assert.property(objToTest, 'name');
    });
    /*it('should have a property name', function() {
        objToTest.should.have.property('name');
    });*/

});

describe('Login', function() {
    
    it('shoud have status 200', function(done) {
        //not work with .then use .end
        chai.request(app).get('/login').end(function(res) {
            expect(res).to.have.status(200);
            done();
        });
            
    });
    
    it('shoud be html', function(done) {
        chai.request(app).get('/login').end(function(res) {
            expect(res).to.be.html;
            done();
        });
            
    });
    
});