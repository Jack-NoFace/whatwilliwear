(function($, root, undefined) {
	$(function() {
		var URL = "http://api.openweathermap.org/data/2.5/forecast?";
		var weatherKey = "7d2cb52eef63ebafc920925261b46995";
		var d = new Date(); //get current date and time
		var n = d.getTime() / 1000 //convert to unix
		var x = Math.round(n); //round to nearest whole number to match format in JSON
		var dtJSON = [];
		var currentCity = "";
		var weatherJSON = [];

		

		 if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
				// URL = URL + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric" + "&APPID=" + weatherKey;
				URL = "/forecast.json";
				$.getJSON(URL, function(data){
					console.log(data);

					//Store the current city
					currentCity = data.city.name;

					//Loop through data to grab all the date/time values

					var j = 0

					for(j= 0; j < data.list.length; j++) {
						dtJSON[j] = [
							data.list[j].dt
						];
					}

				
					//Work out which dt value in JSON is closest to our dt value
					var closest = dtJSON.reduce(function(prev, curr) {
					return (Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev);
					});
					
					
					//Store the weather data for the dt nearest to ours onwards
					var i = 0;

					for (i = 0; i < data.list.length; i++) {
						if(data.list[i].dt >= closest) {
							weatherJSON[i] = [
								data.list[i].dt,
								data.list[i].main.temp,
								data.list[i].main.humidity,
								data.list[i].weather[0].description,
								data.list[i].wind.speed
							];
						}
					}

					// loop through to identify the arrays closest to our dt



					console.log(d);
					console.log(n);
					console.log(x);
					console.log(dtJSON);
					console.log(closest);
					console.log(currentCity);
					console.log(weatherJSON);
				});

			});
        } else {

		}
	});
})(jQuery, this);
