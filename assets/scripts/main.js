(function($, root, undefined) {
	$(function() {
		var URL = "http://api.openweathermap.org/data/2.5/forecast?";
		var weatherKey = "7d2cb52eef63ebafc920925261b46995";
		var d = new Date(); //get current date and time
		var n = d.getTime() / 1000 //convert to unix
		var x = Math.round(n); //round to nearest whole number to match format in JSON
		var currentCity = "";
		var weatherJSON = [];
		var weather24hoursJSON = [];
		var temp24hoursJSON = [];
		var humidity24hoursJSON = [];
		var windspeed24hoursJSON = [];
		var averageTemp; 
		var averageHumidity; 
		var avergeWindSpeed; 
		var todaysTemp;
		var rain = [];
		

		 if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
				URL = URL + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric" + "&APPID=" + weatherKey;
				// URL = "/forecast.json";
				$.getJSON(URL, function(data){
					console.log(data);

					//Store the current city
					currentCity = data.city.name;
					
					
					//Store the weather data for the dt nearest to ours onwards
					var i = 0;

					for (i = 0; i < data.list.length; i++) {
						weatherJSON[i] = [
							data.list[i].dt,
							data.list[i].main.temp,
							data.list[i].main.humidity,
							data.list[i].weather[0].description,
							data.list[i].wind.speed,
							data.list[i].rain[0]
						];
					}

					//Get weather data for the next 24 hours only
					i = 0;

					for (i = 0; i < 8; i++) {
						weather24hoursJSON[i] = [
							data.list[i].dt,
							data.list[i].main.temp,
							data.list[i].main.humidity,
							data.list[i].weather[0].description,
							data.list[i].wind.speed,
							data.list[i].rain[0]
						];
					}

					//Is it going to rain 

					i = 0;

					for (i = 0; i < 8; i++) {
						rain[i] = [
							data.list[i].rain[0]
						];
					}

					if (rain > 0) {
						rain = true;
						$("#rain").html("It's going to rain today - take your umbrella and rain coat.");
					} else {
						$("#rain").html("Skies are dry, no need for an umbrella or your coat.");
					}




					//Work out average temperature
					i = 0;
					
					for (i = 0; i < 8; i++) {
						temp24hoursJSON[i] = [
							data.list[i].main.temp
						];
					}

					averageTemp = (temp24hoursJSON[0][0] + temp24hoursJSON[1][0] + temp24hoursJSON[2][0] + temp24hoursJSON[3][0] + temp24hoursJSON[4][0] + temp24hoursJSON[5][0] + temp24hoursJSON[6][0] + temp24hoursJSON[7][0]) / 8;

					//Work out average humidity
					i = 0;
					
					for (i = 0; i < 8; i++) {
						humidity24hoursJSON[i] = [
							data.list[i].main.humidity
						];
					}

					averageHumidity = (humidity24hoursJSON[0][0] + humidity24hoursJSON[1][0] + humidity24hoursJSON[2][0] + humidity24hoursJSON[3][0] + humidity24hoursJSON[4][0] + humidity24hoursJSON[5][0] + humidity24hoursJSON[6][0] + humidity24hoursJSON[7][0]) / 8;
					

					//Work out average wind speed
					i = 0;
					
					for (i = 0; i < 8; i++) {
						windspeed24hoursJSON[i] = [
							data.list[i].wind.speed
						];
					}

					averageWindSpeed = (windspeed24hoursJSON[0][0] + windspeed24hoursJSON[1][0] + windspeed24hoursJSON[2][0] + windspeed24hoursJSON[3][0] + windspeed24hoursJSON[4][0] + windspeed24hoursJSON[5][0] + windspeed24hoursJSON[6][0] + windspeed24hoursJSON[7][0]) / 8;


					//Set rules for temperature 

					if (averageTemp >= 35) {
						todaysTemp = "Blazing";
						$("#temp").html("It is blazing hot out there today. Wear as little as you can get away with, and take the suncream!");
					} else if (averageTemp >= 25 && averageTemp <= 34) {
						todaysTemp = "Hot";
						$("#temp").html("It's going to be pretty hot today. You'll want shorts, t-shirt or a summer dress on!");
					} else if (averageTemp >= 18 && averageTemp <= 24) {
						todaysTemp = "Warm";
						$("#temp").html("It's going to be pretty hot today. You'll want shorts, t-shirt or a summer dress on!");
					} else if (averageTemp >= 13 && averageTemp <= 17) {
						todaysTemp = "Coolish";
						$("#temp").html("The temperature could be described as coolish outside today. It might be worth taking a jumper with you!");
					} else if (averageTemp >= 8 && averageTemp <= 12) {
						todaysTemp = "Cool";
						$("#temp").html("It's not quite cold, and not quite warm. Jeans, shirt and a thickish jumper is probably the order of the day.");
					} else if (averageTemp >= 4 && averageTemp <= 7) {
						todaysTemp = "Cold";
						$("#temp").html("It's cold out there, wear warm clothes today.");
					} else if ( averageTemp <= 3) {
						todaysTemp = "Freezing";
						$("#temp").html("It's freezing today. Grab your wooly hat, gloves, scarf and thick jumper - or hey just stay inside!");
					} 

					//Set rules for humidity 

					if (averageHumidity > 85) {
						$("#humidity").html("You'll want to make sure your're wearing light, cotton or linen clothing - humidity is high today.");
					}


					$(".loader--full").hide();


					$("#currentWeather").html("It's looking like we're going to have a " + weatherJSON[0][3] + " today!");
					$("#currentTemp").html("With a temperature of " + weatherJSON[0][1] +" degrees celcius.")



					console.log(d);
					console.log(n);
					console.log(x);
					console.log(currentCity);
					console.log(weatherJSON);
					console.log(weather24hoursJSON);
					console.log(temp24hoursJSON);
					console.log(humidity24hoursJSON);
					console.log(averageTemp);
					console.log(averageHumidity);
					console.log(averageWindSpeed);
					console.log(todaysTemp);
				});

			});
		}
		
		if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
	});
})(jQuery, this);
