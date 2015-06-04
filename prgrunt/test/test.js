var assert = require("chai").assert; // The Assert API covers the TDD assertion style.
var chai = require("chai");
chai.should(); // The Expect / Should API covers the BDD assertion styles.

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