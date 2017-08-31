/**
 * 
 */
$(document).ready(function(){
	var getLocation = function(){
		var day = new Date();
		console.log(day.getDay());
		var year = new Array(15);
		var weekday = new Array(14);
			weekday[0] =  "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";
			weekday[7] =  "Sunday";
			weekday[8] = "Monday";
			weekday[9] = "Tuesday";
			weekday[10] = "Wednesday";
			weekday[11] = "Thursday";
			weekday[12] = "Friday";
			weekday[13] = "Saturday";
		var week = new Array(7);
			week[0] = weekday[day.getDay()];
			week[1] = weekday[day.getDay()+1];
			week[2] = weekday[day.getDay()+2];
			week[3] = weekday[day.getDay()+3];
			week[4] = weekday[day.getDay()+4];
			week[5] = weekday[day.getDay()+5];
			week[6] = weekday[day.getDay()+6];
		var locat = $('#term').val();
		if (locat == ''){
			$('#weather').html("<h2 class='loading'>Please enter a valid location.</h2>");
		}
		else{
			$('#weather').html("<h2 class='loading'>Your weather information is loading.</h2>");
		}
		if (typeof(Storage) !== "undefined") {
		var prevLocs = JSON.parse(localStorage.getItem("previousLocations")) || [];
		prevLocs.push(locat);
		localStorage.setItem("previousLocations",JSON.stringify(prevLocs));
		}
		$.ajax({
			url: "https://maps.googleapis.com/maps/api/geocode/json?address="+locat+"&key=AIzaSyAeW0g8upAj9bQDvzgjUgjak8V1Ib_IClA",
			dataType: "json",
			cache: true
		}).done(function(maps){
			if(maps != 'Nothing found.'){
				console.log(maps);
				var latitude = maps.results[0].geometry.location.lat;
				var longitude = maps.results[0].geometry.location.lng;
				$.ajax({
					  dataType: "jsonp",
					  type: "GET",
					  cache: true,
					  url: "https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude
					  }).done(function ( wr ) {
						year[0] = wr.daily.data[0].apparentTemperatureMin;
						year[5] = wr.daily.data[0].apparentTemperatureMax;
						year[10] = wr.currently.apparentTemperature;
						console.log(wr);
						console.log(day.getTime());
						var weatherCurrent = '<br />\
						<br \> \
							<div class="weatherTable" border=5> \
							<table class="myTable">\
							<caption>Today\'s Information</caption>\
							<thead>\
							<tr>\
								<th>Day</th>\
								<th>Summary</th>\
								<th>Apparent Temperature</th>\
								<th>Percent chance of Percipitation</th>\
								<th>Visibility</th>\
							</tr>\
							<thead>\
							<tr>\
								<td>'+week[0]+'</td>\
								<td class="s">'+wr.currently.summary+'</td>\
								<td class="n">'+wr.currently.apparentTemperature+'</td>\
								<td class="n">'+Math.round(wr.currently.precipProbability*100)+'%</td>\
								<td class="n">'+wr.currently.visibility+'</td>\
							<tr>\
							</tr>\
							</table>\
							</div>\
							<br \> \
						';
						var weather = '<br \> \
							<br \> \
							<div class="weatherTable" border=5> \
							<table class="myTable">\
							<thead>\
							<tr>\
								<th>Day</th>\
								<th>Min temp</th>\
								<th>Max temp</th>\
								<th>Summary</th>\
							</tr>\
							<thead>\
							<tr>\
								<td>Today</td>\
								<td class="n">'+wr.daily.data[0].apparentTemperatureMin+'</td>\
								<td class="n">'+wr.daily.data[0].apparentTemperatureMax+'</td>\
								<td class="s">'+wr.daily.data[0].summary+'</td>\
							<tr>\
							</tr>\
								<td>'+week[1]+'</td>\
								<td class="n">'+wr.daily.data[1].apparentTemperatureMin+'</td>\
								<td class="n">'+wr.daily.data[1].apparentTemperatureMax+'</td>\
								<td class="s">'+wr.daily.data[1].summary+'</td>\
							<tr>\
							</tr>\
								<td>'+week[2]+'</td>\
								<td class="n">'+wr.daily.data[2].apparentTemperatureMin+'</td>\
								<td class="n">'+wr.daily.data[2].apparentTemperatureMax+'</td>\
								<td class="s">'+wr.daily.data[2].summary+'</td>\
							<tr>\
							</tr>\
							</table>\
							</div>\
							<br \> \
							';
						$('#weather').html(weather);
						$('#weatherCurrent').html(weatherCurrent);
						var img = 'clear';
						switch(wr.currently.summary){
							case 'Raining':
							case 'Light Rain':
								img = 'rainy';
								break;
							case 'Partly Cloudy':
								img = 'partlyCloudy';
								break;
							case 'Partly Sunny':
								img = 'partlySunny';
								break;
							case 'Snowing':
							case 'Light Snow':
								img = 'snowing';
								break;
							case 'Mostly Cloudy':
							case 'Cloudy':
								img = 'mostlyCloudy';
								break;
							case 'Sunny':
							case 'Mostly Sunny':
								img = 'sunny';
								break;
							default:
								break;
						}
						$('.jumbotron').css('background-image','url("../SkyCast/imgs/'+img+'.jpeg")');
						var config = {
							type: 'line',
							data: {
								labels:[week[0],week[1],week[2],week[3],week[4],week[5],week[6]],
								datasets: [{
									label: 'Apparent Min Temp',
									fill: false,
									backgroundColor: "rgb(54, 162, 235)",
									borderColor: "rgb(54, 162, 235)",
									data: [
										wr.daily.data[0].apparentTemperatureMin,
										wr.daily.data[1].apparentTemperatureMin,
										wr.daily.data[2].apparentTemperatureMin,
										wr.daily.data[3].apparentTemperatureMin,
										wr.daily.data[4].apparentTemperatureMin,
										wr.daily.data[5].apparentTemperatureMin,
										wr.daily.data[6].apparentTemperatureMin
									],
								},
									{
									label: "Apparent Max Temp",
									fontColor: "white",
									fill: false,
									backgroundColor: "rgb(255, 99, 132)",
									borderColor: "rgb(255, 99, 132)",
									data: [
										wr.daily.data[0].apparentTemperatureMax,
										wr.daily.data[1].apparentTemperatureMax,
										wr.daily.data[2].apparentTemperatureMax,
										wr.daily.data[3].apparentTemperatureMax,
										wr.daily.data[4].apparentTemperatureMax,
										wr.daily.data[5].apparentTemperatureMax,
										wr.daily.data[6].apparentTemperatureMax
									],
								}]
							},
							options: {
								legend: {
									labels: {
										fontColor: "white"
									}
								},
								responsive: true,
								title:{
									display:true,
									fontColor: "white",
									text:'Apparent Temp Graph'
								},
								tooltips: {
									mode: 'index',
									intersect: false,
								},
								hover: {
									mode: 'nearest',
									intersect: true
								},
								scales: {
									xAxes: [{
										ticks: {
										fontColor: "white"
										},
										display: true,
										gridLines: {
										  display: true ,
										  color: "#FFFFFF"
										},
										scaleLabel: {
											display: true,
											labelString: 'Day',
											fontColor: "white"
										}
									}],
									yAxes: [{
										ticks: {
										fontColor: "white"
										},
										display: true,
										gridLines: {
										  display: true ,
										  color: "white"
										},
										scaleLabel: {
											display: true,
											labelString: 'Temperature',
											fontColor: "white"
										}
									}]
								}
							}
						};
						
						var ctx = document.getElementById("myChart").getContext("2d");
						window.myLine = new Chart(ctx, config);
					});
					day.setFullYear( day.getFullYear() - 1 );
					console.log(day.getTime());
					$.ajax({
					  dataType: "jsonp",
					  type: "GET",
					  cache: true,
					  url: "https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude+","+Math.floor(day.getTime()/1000)
					  }).done(function ( wr2 ) {
						  console.log(wr2);
						  year[1]= wr2.daily.data[0].apparentTemperatureMin;
						  year[6]= wr2.daily.data[0].apparentTemperatureMax;
						  year[11]= wr2.currently.apparentTemperature;
						  day.setFullYear( day.getFullYear() - 1 );
							$.ajax({
							  dataType: "jsonp",
							  cache: true,
							  type: "GET",
							  url: "https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude+","+Math.floor(day.getTime()/1000)
							  }).done(function ( wr3 ) {
								  year[2]= wr3.daily.data[0].apparentTemperatureMin;
								  year[7]= wr3.daily.data[0].apparentTemperatureMax;
								  year[12]= wr3.currently.apparentTemperature;
								  day.setFullYear( day.getFullYear() - 1 );
									$.ajax({
									  dataType: "jsonp",
									  cache: true,
									  type: "GET",
									  url: "https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude+","+Math.floor(day.getTime()/1000)
									  }).done(function ( wr4 ) {
										  year[3]= wr4.daily.data[0].apparentTemperatureMin;
										  year[8]= wr4.daily.data[0].apparentTemperatureMax;
										  year[13]= wr4.currently.apparentTemperature;
										  day.setFullYear( day.getFullYear() - 1 );
											$.ajax({
											  dataType: "jsonp",
											  cache: true,
											  type: "GET",
											  url: "https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude+","+Math.floor(day.getTime()/1000)
											  }).done(function ( wr5 ) {
												  year[4]= wr5.daily.data[0].apparentTemperatureMin;
												  year[9]= wr5.daily.data[0].apparentTemperatureMax;
												  year[14] = wr5.currently.apparentTemperature;
												  var config2 = {
							type: 'line',
							data: {
								labels:[day.getYear()+1900,day.getYear()+1901,day.getYear()+1902,day.getYear()+1903,day.getYear()+1904],
								datasets: [{
									label: 'Apparent Min Temp',
									fill: false,
									fontColor: 'white',
									backgroundColor: "rgb(54, 162, 235)",
									borderColor: "rgb(54, 162, 235)",
									data: [
										year[4],
										year[3],
										year[2],
										year[1],
										year[0],
									],
								},
									{
									label: "Apparent Max Temp",
									fontColor: "white",
									fill: false,
									backgroundColor: "rgb(255, 99, 132)",
									borderColor: "rgb(255, 99, 132)",
									data: [
										year[9],
										year[8],
										year[7],
										year[6],
										year[5]
									],
								},
									{
									label: "Current Temp",
									fontColor: "white",
									fill: false,
									backgroundColor: "rgb(255, 255, 0)",
									borderColor: "rgb(255, 255, 0)",
									data: [
										year[14],
										year[13],
										year[12],
										year[11],
										year[10]
									],
								}]
							},
							options: {
								legend: {
									labels: {
										fontColor: "white"
									}
								},
								responsive: true,
								title:{
									display:true,
									fontColor: "white",
									text:'Apparent Temp Over Years Graph'
								},
								tooltips: {
									mode: 'index',
									intersect: false,
								},
								hover: {
									mode: 'nearest',
									intersect: true
								},
								scales: {
									xAxes: [{
										ticks: {
										fontColor: "white"
										},
										display: true,
										gridLines: {
										  display: true ,
										  color: "white"
										},
										scaleLabel: {
											display: true,
											labelString: 'Year',
											fontColor: "white"
										}
									}],
									yAxes: [{
										ticks: {
										fontColor: "white"
										},
										display: true,
										gridLines: {
										  display: true ,
										  color: "white"
										},
										scaleLabel: {
											display: true,
											labelString: 'Temperature',
											fontColor: "white"
										}
									}]
								}
							}
						};
					var ctx = document.getElementById("myYearChart").getContext("2d");
						window.myLine = new Chart(ctx, config2);
											});
									});
							});
					});				
				}				
			})
	}
	
	var getPrevLoc = function(){
		var prevLocs = JSON.parse(localStorage.getItem("previousLocations"));
		var hst = '<div class="locationsTable"> \
			<table class="myTable">\
			<tbody>\
			<thead> \
				<tr><th>Previous Locations:</th></tr> \
			</thead> \
			';
			
		for (var i = 0; i < prevLocs.length; i++) {
			hst += "<tr><td class='s'>" + prevLocs[i] + "</td></tr>";
	}
		hst += '</tbody> \
			</table>';
		$('#prevLoc').html(hst);
	}
	
	$('#search').click(getLocation);
	$('#term').keyup(function(event){
	    if(event.keyCode == 13){
	        getLocation();
			
	    }
	});
	$('#history').click(getPrevLoc);
	$('#term').keyup(function(event){
	    if(event.keyCode == 13){
	        getPrevLoc();
			
	    }
	});
	
});

