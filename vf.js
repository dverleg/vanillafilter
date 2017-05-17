;(function() {
	this.Filter = function() {
		this.options = {
			'triggerId': 'dvtrigger',
			'targetDataAttribute': 'dvtarget',
			'displayType': 'block',
		}

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(this.options, arguments[0]);
		}

		this.filterTrigger = document.getElementById(this.options.triggerId);

		if(this.filterTrigger){
			this.handler = this.filterTrigger.tagName === 'SELECT' ? 'change' : 'click';

			this.bind();
		}
	};

	Filter.prototype.bind = function() {
		this.filterTrigger.addEventListener(this.handler, this.triggerFilter.bind(this), true);
	}

	Filter.prototype.destroy = function() {
		if (this.filterTrigger) {
			this.filterTrigger.removeEventListener(this.handler, this.triggerFilter.bind(this), true);
		}
	}

	Filter.prototype.triggerFilter = function() {
		var _ = this;

		var allItems = document.querySelectorAll('[data-' + _.options.targetDataAttribute + ']');
		var itemsToShow = document.querySelectorAll('[data-' + _.options.targetDataAttribute + '="' + _.filterTrigger.value + '"]');

		var allItemsArray = Object.keys(allItems).map(function(index) {
			return allItems[index];
		});
		var itemsToShowArray = Object.keys(itemsToShow).map(function(index) {
			return itemsToShow[index];
		});

		allItemsArray.filter(function(item) {
			return item.style.display = (itemsToShowArray.indexOf(item) !== -1 || _.filterTrigger.value === '') ? _.options.displayType : 'none';
		});
	};

	function extendDefaults(source, properties) {
		for (var property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}

		return source;
	}

})();
