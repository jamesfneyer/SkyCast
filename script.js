/**
 * 
 */
$(document).ready(function(){
	var getLocation = function(){
		var day = new Date();
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
		console.log(prevLocs);
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
					  console.log(wr);
						var weather = '<div class="weatherTable"> \
							<table>\
							<tr>\
								<th>Day</th>\
								<th>Min temp</th>\
								<th>Max temp</th>\
								<th>Summary</th>\
							</tr>\
								<td>Today</td>\
								<td>'+wr.daily.data[0].apparentTemperatureMin+'</td>\
								<td>'+wr.daily.data[0].apparentTemperatureMax+'</td>\
								<td>'+wr.daily.data[0].summary+'</td>\
								<td>'+wr.currently.apparentTemperature+'</td>\
							<tr>\
							</tr>\
								<td>'+weekday[day.getDay()+1]+'</td>\
								<td>'+wr.daily.data[1].apparentTemperatureMin+'</td>\
								<td>'+wr.daily.data[1].apparentTemperatureMax+'</td>\
								<td>'+wr.daily.data[1].summary+'</td>\
							<tr>\
							</tr>\
								<td>'+weekday[day.getDay()+2]+'</td>\
								<td>'+wr.daily.data[2].apparentTemperatureMin+'</td>\
								<td>'+wr.daily.data[2].apparentTemperatureMax+'</td>\
								<td>'+wr.daily.data[2].summary+'</td>\
							<tr>\
							</tr>\
							</table>\
							</div>\
							';
						$('#weather').html(weather);
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
								responsive: true,
								title:{
									display:true,
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
										display: true,
										scaleLabel: {
											display: true,
											labelString: 'Day'
										}
									}],
									yAxes: [{
										display: true,
										scaleLabel: {
											display: true,
											labelString: 'Temperature'
										}
									}]
								}
							}
						};
						var ctx = document.getElementById("myChart").getContext("2d");
						window.myLine = new Chart(ctx, config);
					});
				
				}
				
			})
	}
	
	var getPrevLoc = function(){
		var prevLocs = JSON.parse(localStorage.getItem("previousLocations"));
		var hst = '<div class="locationsTable"> \
			<table>\
			<tbody>\
			<thead> \
				<tr><td>Previous Locations:</td></tr> \
			</thead> \
			';
			
		for (var i = 0; i < prevLocs.length; i++) {
			hst += "<tr><td>" + prevLocs[i] + "</td></tr>";
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

