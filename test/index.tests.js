var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var assert = chai.assert;
var expect = chai.expect;
var vf = require('../src/scripts/vanillafilter');

describe('VanillaFilter', function() {
	it('should create a VanillaFilter instance with an "options" property', function() {
		var VFoptionsObject = new VanillaFilter();

		assert.isObject(VFoptionsObject, 'VanillaFilter instance is an object');
		assert.isObject(VFoptionsObject.options, 'VanillaFilter.options is an object');
	});

	it('should have a bind function', function() {
		var VFbindFn = new VanillaFilter();

		assert.isFunction(VFbindFn.bind, 'VanillaFilter.bind exists and is a function');
	});

	it('should have a triggerFilter function', function() {
		var VFtriggerFilterFn = new VanillaFilter();

		assert.isFunction(VFtriggerFilterFn.triggerFilter, 'VanillaFilter.triggerFilter exists and is a function');
	});

	it('should have a callback function in the settings', function() {
		var VFbindCallbackFn = new VanillaFilter();

		assert.isFunction(VFbindCallbackFn.options.vanillaCallbackFunction, 'VanillaFilter.options.vanillaCallbackFunction exists and is a function');
	});

	it('should have a fallback function', function() {
		var VFbindFallbackFn = new VanillaFilter();

		assert.isFunction(VFbindFallbackFn.fallback, 'VanillaFilter.fallback exists and is a function');
	});

	it('should override user input options', function() {
		var VFdefaultOptions = new VanillaFilter();
		var defaultOptions = VFdefaultOptions.options;
		var VFcustomOptions = new VanillaFilter({
			'vanillaDisplayType': 'flex'
		});
		var customOptions = VFcustomOptions.options;

		expect(defaultOptions).to.not.equal(customOptions);
	});
});
