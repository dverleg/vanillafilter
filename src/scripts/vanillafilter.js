(function() {
	/**
	 * Create VanillaFilter instance
	 */
	this.VanillaFilter = function() {
		/**
		 * Default options for filtering
		 * @type {Object}
		 */
		this.options = {
			debug: false,
			vanillaTrigger: 'vanillatrigger',
			vanillaTarget: 'vanillatarget',
			vanillaDisplayType: 'block',
			vanillaFallbackSelector: '.vanilla-no-results',
			vanillaCallbackFunction: function() {}
		}

		/**
		 * Override defaults by settings from user
		 * @param  {Object}
		 */
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = _extendDefaults(this.options, arguments[0]);
		}

		if(this.options.debug === true) {
			console.log('vanillafilter: Found options: [', this.options ,']');
		}

		/**
		 * Get all the filterTrigger elements to trigger filtering
		 * @type {Elements Object} | {Element}
		 */
		this.vanillaFallback = document.querySelectorAll(this.options.vanillaFallbackSelector);
		this.filterTrigger = document.querySelectorAll('[data-' + this.options.vanillaTrigger + ']');
		this.filterValues = [];

		/**
		 * Check if we have any filterTrigger instances
		 * @param  {Elements Object} | {Element}
		 */
		if (this.filterTrigger) {
			var _ = this;

			Object.keys(_.filterTrigger).map(function(index) {
				return _.bind(_.filterTrigger[index], _getTriggerHandler(_.filterTrigger[index]));
			});
		}

		/**
		 * If we have a fallback element, hide it on init
		 * @param  {Element} element
		 */
		if(this.vanillaFallback) {
			if(this.options.debug === true) {
				console.log('vanillafilter: Found fallback element(s): [', this.vanillaFallback ,'], hiding it on initialisation');
			}

			this.fallback(false);
		}
	}

	/**
	 * Bind the filter logic to a filterTrigger element
	 * @param  {Element} element
	 * @param  {String} handler
	 */
	VanillaFilter.prototype.bind = function(element, handler) {
		if(this.options.debug === true) {
			console.log('vanillafilter: Bound filterTrigger to our vanillafilter: [', element ,'] with handler: [', handler ,']');
		}

		return element.addEventListener(handler, this.triggerFilter.bind(this), true);
	}

	/**
	 * Filter logic to show/hide elements based on their value
	 */
	VanillaFilter.prototype.triggerFilter = function(event) {
		event.preventDefault();

		var _ = this,
			activeFilter = event.target;

		/**
		 * Set the correct active filters
		 */
		_.filterValues = _getFilterValues(activeFilter, _.options.vanillaTrigger, _.filterValues);

		if(_.options.debug === true) {
			console.log('vanillafilter: triggerFilter called for: [', activeFilter ,']. filterValues: [', _.filterValues ,'] added to activeFilters');
		}

		/**
		 * Get all the targets to filter on
		 */
		var allTargets = Object.keys(document.querySelectorAll('[data-' + _.options.vanillaTarget + ']')).map(function(index) {
			return document.querySelectorAll('[data-' + _.options.vanillaTarget + ']')[index];
		});

		/**
		 * Filter the correct results and show/hide them
		 * @param  {Element} item
		 */
		var results = [],
			hide = [];

		allTargets.filter(function(targetElement, index) {
			var shouldShowTargetItem = false;

			if(_.filterValues.length === 0) {
				if(_.options.debug === true && index === 0) {
					console.log('vanillafilter: No filter values found, triggering display: [', _.options.vanillaDisplayType ,'] for all targets');
				}

				targetElement.style.display = _.options.vanillaDisplayType;
			} else {
				_.filterValues.filter(function(activeFilter) {
					var targetValues = _getTargetValues(targetElement, _.options.vanillaTarget);

					if(!shouldShowTargetItem) {
						shouldShowTargetItem = targetValues.includes(activeFilter);
					}
				});

				/**
				 * Check if we should show the item or not, if true, push it to our results array
				 * @param  {Boolean} should we show the target item?
				 */
				if(shouldShowTargetItem) {
					if(_.options.debug === true) {
						console.log('vanillafilter: Set display: [', _.options.vanillaDisplayType ,'] for targetElement: [', targetElement ,']. Pushing to results: [', results ,']');
					}

					targetElement.style.display = _.options.vanillaDisplayType;
					results.push(targetElement);

					_vanillaCallback(_.options.vanillaCallbackFunction, targetElement, _.options.debug);
				} else {
					targetElement.style.display = 'none';
					hide.push(targetElement);
				}
			}
		});

		if(_.options.debug === true) {
			console.log('vanillafilter: Hiding target elements: [', hide ,']');
		}

		/**
		 * Trigger the fallback function on every filter change
		 * and show a fallback element if there are 0 results
		 */
		if(this.vanillaFallback.length) {
			this.fallback(_.filterValues.length && !results.length);
		}
	}

	/**
	 * Show a fallback element when we have active filters, but no results are returned.
	 */
	VanillaFilter.prototype.fallback = function(show) {
		var _ = this,
			display = (show ? 'block' : 'none');

		Object.keys(_.vanillaFallback).map(function(index) {
			_.vanillaFallback[index].style.display = display;
		});
	}

	/**
	 * Extend default options by user input options
	 * @param  {Object} options
	 * @param  {Object} overrides
	 */
	_extendDefaults = function(options, overrides) {
		for (var option in overrides) {
			if (overrides.hasOwnProperty(option)) {
				options[option] = overrides[option];
			}
		}

		return options;
	}

	/**
	 * Get the correct handler for the clicked filter trigger
	 * @param  {Element} element
	 */
	_getTriggerHandler = function(element) {
		var handler = ['SELECT', 'INPUT'].includes(element.tagName) ? 'change' : 'click';

		return handler;
	}

	/**
	 * Get the currenct active filter values from filter triggers to filter on
	 * @param  {Element} filterElement
	 * @param  {String} filterTriggerValue
	 */
	_getFilterValues = function(filterElement, filterTriggerValue, currentFilters) {
		var inputValue,
			inputType,
			newFilters = currentFilters;

		if(['SELECT', 'INPUT'].includes(filterElement.tagName)) {
			inputValue = filterElement.value;
			inputType = filterElement.getAttribute('type');
		} else {
			inputValue = filterElement.dataset[filterTriggerValue];
		}

		if(inputValue === "") {
			newFilters = [];
		} else {
			if(['SELECT'].includes(filterElement.tagName) || inputType === 'radio') {
				newFilters = [];
				newFilters.push(inputValue);
			} else {
				if(currentFilters.includes(inputValue)) {
					newFilters.splice(newFilters.indexOf(inputValue), 1);
				} else {
					newFilters.push(inputValue);
				}
			}
		}

		return newFilters;
	}

	/**
	 * Get the filter values from a target element that should be filtered
	 * @param  {Element} targetElement
	 * @param  {String} targetFilterValue
	 */
	_getTargetValues = function(targetElement, targetFilterValue) {
		var targetValues = targetElement.dataset[targetFilterValue],
			trimmedTargetValues = targetValues.replace(/\s/g, ''),
			separateTrimmedTargetValues = trimmedTargetValues.split(',');

		return separateTrimmedTargetValues.filter(Boolean);
	}

	/**
	 * If a callback function is set, call it for this targetElement
	 * @param  {Function} callbackFunction to trigger
	 */
	_vanillaCallback = function(callbackFunction, targetElement, debug) {
		if(typeof callbackFunction === 'function') {
			if(debug === true) {
				console.log('vanillafilter: vanillaCallbackFunction called for element: [', targetElement ,']');
			}

			return callbackFunction(targetElement);
		}

		return;
	}

})();
