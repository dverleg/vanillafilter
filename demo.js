var targets = Object.keys(document.querySelectorAll('[data-vanillatrigger]')).map(function(index) {
	return document.querySelectorAll('[data-vanillatrigger]')[index];
});

targets.filter(function(item) {
	item.addEventListener('click', function() {
		if(typeof item.value === 'undefined' || item.value === "") {
			targets.filter(function(item) {
				item.checked = false;
				return item.classList.remove('is-active');
			})
		} else {
			return item.classList.toggle('is-active');
		}
	});
});
