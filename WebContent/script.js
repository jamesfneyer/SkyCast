/**
 * 
 */
$document.ready(function(){
	alert("Is working");
	var getlocation = function(){
		var location = $('#term').val();
		if (location == ''){
			$('#weather').html("<h2 class='loading'>Please enter a valid location.</h2>");
		}
		else{
			$('#weather').html("<h2 class='loading'>Your weather information is loading.</h2>");
		}
		$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=AIzaSyDG4Xxy7UiQKWwO-ib2qns4q99Ejxb_mUY",function(json){
			if(json != 'Nothing found.'){
				var latitude = json[0].results.geometry.location.lat;
				var longitude = json[0].results.geometry.location.lng;
				$.getJSON("https://api.darksky.net/forecast/3d319c74f6ad25c2f4255d959d7a8ef3/"+latitude+","+longitude,function(json2){
					if(json != 'Nothing found.'){
						var weather = '<div class="weatherTable"> \
							<table>\
							<tr>\
								<th>Today</th>\
								<th>Tomorrow</th>\
								<th>The Day after tommorrow</th>\
							</tr>\
								<td></td>\
								<td></td>\
								<td></td>\
							<tr>\
							</tr>\
							</table>\
							';
						$('#weather').html(weather);
					}
				})
			}
		})
		
	}
	
	$('#search').click(getLocation);
	   $('#term').keyup(function(event){
	       if(event.keyCode == 13){
	           getLocation();
	       }
	   });
});

