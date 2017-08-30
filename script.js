/**
 * 
 */
$(document).ready(function(){
	var getLocation = function(){
		var day = new Date();
		var year = new Array(10);
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
		$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+locat+"&key=AIzaSyAeW0g8upAj9bQDvzgjUgjak8V1Ib_IClA",function(maps){
			if(maps != 'Nothing found.'){
				console.log(maps);
				var latitude = maps.results[0].geometry.location.lat;
				var longitude = maps.results[0].geometry.location.lng;
				$.ajax({
					  dataType: "jsonp",
					  url: "https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude
					  }).done(function ( wr ) {
						year[0] = wr.daily.data[0].apparentTemperatureMin;
						year[5] = wr.daily.data[0].apparentTemperatureMax;
					  console.log(wr);
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
								<th>Currently</th>\
							</tr>\
							<thead>\
							<tr>\
								<td>Today</td>\
								<td class="n">'+wr.daily.data[0].apparentTemperatureMin+'</td>\
								<td class="n">'+wr.daily.data[0].apparentTemperatureMax+'</td>\
								<td class="s">'+wr.daily.data[0].summary+'</td>\
								<td class="n">'+wr.currently.apparentTemperature+'</td>\
							<tr>\
							</tr>\
								<td>'+weekday[day.getDay()+1]+'</td>\
								<td class="n">'+wr.daily.data[1].apparentTemperatureMin+'</td>\
								<td class="n">'+wr.daily.data[1].apparentTemperatureMax+'</td>\
								<td class="s">'+wr.daily.data[1].summary+'</td>\
							<tr>\
							</tr>\
								<td>'+weekday[day.getDay()+2]+'</td>\
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
								labels:[weekday[day.getDay()],weekday[day.getDay()+1],weekday[day.getDay()+2],weekday[day.getDay()+3],weekday[day.getDay()+4],weekday[day.getDay()+5],weekday[day.getDay()+6]],
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
					  url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude+","+day.getTime()
					  }).done(function ( wr2 ) {
						  year[2]= wr2.daily.data.apparentTemperatureMin;
						  year[7]= wr2.daily.data.apparentTemperatureMax;
						  day.setFullYear( day.getFullYear() - 1 );
							$.ajax({
							  dataType: "jsonp",
							  url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude+","+day.getTime()
							  }).done(function ( wr3 ) {
								  year[3]= wr3.daily.data.apparentTemperatureMin;
								  year[8]= wr3.daily.data.apparentTemperatureMax;
								  day.setFullYear( day.getFullYear() - 1 );
									$.ajax({
									  dataType: "jsonp",
									  url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude+","+day.getTime()
									  }).done(function ( wr4 ) {
										  year[4]= wr4.daily.data.apparentTemperatureMin;
										  year[9]= wr4.daily.data.apparentTemperatureMax;
										  day.setFullYear( day.getFullYear() - 1 );
											$.ajax({
											  dataType: "jsonp",
											  url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude+","+day.getTime()
											  }).done(function ( wr5 ) {
												  year[1]= wr5.daily.data.apparentTemperatureMin;
												  year[6]= wr5.daily.data.apparentTemperatureMax;
												  var config2 = {
							type: 'line',
							data: {
								labels:[day.getYear()-5,day.getYear()-4,day.getYear()-3,day.getYear()-2,day.getYear()-1,day.getYear()],
								datasets: [{
									label: 'Apparent Min Temp',
									fill: false,
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
										  color: "#FFFFFF"
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

