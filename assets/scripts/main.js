(function($, root, undefined) {
	$(function() {
		 if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
				console.log("lat: " + position.coords.latitude);
				console.log("lng: " + position.coords.longitude);
            });
        }
	});
})(jQuery, this);
