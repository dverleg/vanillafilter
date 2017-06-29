var targets = Object.keys(document.querySelectorAll('[data-vanillatrigger]')).map(function(index) {
	return document.querySelectorAll('[data-vanillatrigger]')[index];
});

targets.filter(function(item) {
	item.addEventListener('click', function() {

		// Uncheck all triggers
		if(typeof item.value === 'undefined' || item.value === "") {
			resetFilters(targets);
		} else {
			if(VF.options.vanillaSingleFilter) {
				resetFilters(targets);
			}

			item.checked = true;

			return item.classList.toggle('is-active');
		}
	});
});

function resetFilters(targets) {
	targets.filter(function(item) {
		item.checked = false;

		return item.classList.remove('is-active');
	});
}
