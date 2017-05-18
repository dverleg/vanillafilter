var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var vf = require('../src/scripts/vanillafilter');

describe('VanillaFilter', function() {
	it('should create a VanillaFilter instance with an "options" property', function() {
		var VF = new VanillaFilter();

		assert.isObject(VF, 'VanillaFilter instance is an object');
		assert.isObject(VF.options, 'VanillaFilter.options is an object');
	});
});

