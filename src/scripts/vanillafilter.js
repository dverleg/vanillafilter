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
			vanillaTrigger: 'vanillatrigger',
			vanillaTarget: 'vanillatarget',
			vanillaDisplayType: 'block',
			vanillaFallbackSelector: '.vanilla-no-results'
		}

		/**
		 * Override defaults by settings from user
		 * @param  {Object}
		 */
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(this.options, arguments[0]);
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
				return _.bind(_.filterTrigger[index], getTriggerHandler(_.filterTrigger[index]));
			});
		}

		/**
		 * If we have a fallback element, hide it on init
		 * @param  {Element} element
		 */
		if(this.vanillaFallback) {
			this.fallback(false);
		}
	}

	/**
	 * Bind the filter logic to a filterTrigger element
	 * @param  {Element} element
	 * @param  {String} handler
	 */
	VanillaFilter.prototype.bind = function(element, handler) {
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
		_.filterValues = getFilterValues(activeFilter, _.options.vanillaTrigger, _.filterValues);

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
		var results = [];

		allTargets.filter(function(item) {
			if(_.filterValues.length === 0) {
				item.style.display = _.options.vanillaDisplayType;
			} else {
				var intersect = false;

				_.filterValues.filter(function(activeFilter) {
					var targetValues = getTargetValues(item, _.options.vanillaTarget);

					if(!intersect) {
						intersect = targetValues.includes(activeFilter);
					}
				});

				item.style.display = intersect ? _.options.vanillaDisplayType : 'none';

				if(intersect) {
					results.push(item);
				}
			}
		});

		/**
		 * Trigger the fallback function on every filter change
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
	function extendDefaults(options, overrides) {
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
	function getTriggerHandler(element) {
		var handler = ['SELECT', 'INPUT'].includes(element.tagName) ? 'change' : 'click';

		return handler;
	}

	/**
	 * Get the currenct active filter values from filter triggers to filter on
	 * @param  {Element} filterElem
	 * @param  {String} filterTriggerValue
	 */
	function getFilterValues(filterElem, filterTriggerValue, currentFilters) {
		var value,
			newFilters = currentFilters;

		if(['SELECT', 'INPUT'].includes(filterElem.tagName)) {
			value = filterElem.value;
		} else {
			value = filterElem.dataset[filterTriggerValue];
		}

		if(value === "") {
			newFilters = [];
		} else {
			if(currentFilters.includes(value)) {
				newFilters.splice(newFilters.indexOf(value), 1);
			} else {
				newFilters.push(value);
			}
		}

		return newFilters;
	}

	/**
	 * Get the filter values from a target element that should be filtered
	 * @param  {Element} targetElem
	 * @param  {String} targetFilterValue
	 */
	function getTargetValues(targetElem, targetFilterValue) {
		var targetValues = targetElem.dataset[targetFilterValue],
			trimmedTargetValues = targetValues.replace(/\s/g, ''),
			separateTrimmedTargetValues = trimmedTargetValues.split(',');

		return separateTrimmedTargetValues.filter(Boolean);
	}

})();
