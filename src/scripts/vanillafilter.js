;
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
		this.filterTrigger = document.querySelectorAll('[data-' + this.options.vanillaTrigger + ']');

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

		var _ = this;

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
		allTargets.filter(function(item) {
			var shouldShow = (item.dataset[_.options.vanillaTarget] === getFilterValue(event.target, _.options.vanillaTrigger)) || getFilterValue(event.target, _.options.vanillaTrigger) === '';

			return item.style.display = shouldShow ? _.options.vanillaDisplayType : 'none';
		});
	}

	/**
	 * Extend default options by user input options
	 * @param  {Object} source
	 * @param  {Object} properties
	 */
	function extendDefaults(source, properties) {
		for (var property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}

		return source;
	}

	/**
	 * Get the correct handler for the clicked filterTrigger
	 * @param  {Element} element
	 */
	function getTriggerHandler(element) {
		return ['SELECT', 'INPUT'].includes(element.tagName) ? 'change' : 'click';
	}

	/**
	 * Get the value from the filterTrigger to filter on
	 * @param  {Element} target
	 * @param  {String} trigger
	 */
	function getFilterValue(target, trigger) {
		if(['SELECT', 'INPUT'].includes(target.tagName)) {
			return target.value;
		} else {
			return target.dataset[trigger];
		}
	}
})();
