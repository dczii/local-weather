window.onload = function () {
    document.getElementById("icon1").style.display = 'none';
	navigator.geolocation.getCurrentPosition(getCurrentLocation);
    setIcon();
}

let lat = 0;
let long = 0
function getLocation (param) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getCurrentLocation);
    } else { 
        document.getElementById("weather").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getCurrentLocation (position) {
	let currentPosition;
    currentPosition = position;
    lat = currentPosition.coords.latitude;
    long = currentPosition.coords.longitude;
    
	callJSON("metric")
}

function callJSON (val) {
    let unit = val;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + unit + "&APPID=b231606340553d9174136f7f083904b3", function(data) {
        let rawJson = JSON.stringify(data);
        let json = JSON.parse(rawJson);
        updateWeather(json); //Update Weather parameters
    });
}

function updateWeather (position) {
    //set Icon
    document.getElementById("icon1").style.display = 'block';
    document.getElementById("icon2").style.display = 'none';
    setIcon()
    //Set weather name and temp
    document.getElementById("weather_temp").innerHTML = position.main.temp;
	document.getElementById("weather_city").innerHTML = position.name + ", " + position.sys.country;
    //Set Icon Weather
    let weather = position.weather[0].description;
    if(weather.indexOf("rain") >= 0) {
        setIcon(Skycons.RAIN)
        // skycons.set("animated-icon", Skycons.RAIN);
    }
    else if (weather.indexOf("sunny") >= 0) {
        setIcon(Skycons.CLEAR_DAY)
        // skycons.set("animated-icon", Skycons.CLEAR_DAY);
    }
}

function setIcon(val) {
    let skycons = new Skycons({"color": "#64B5F6"});        
    if(val){
        skycons.set("icon1", val);
    }
    else {
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
    }
    skycons.play();
}

function changeTemp(param) {
    if(param.id == "tempF") {
        document.getElementById(param.id).style.fontSize = "1.8em";
        document.getElementById("tempC").style.fontSize = "1em";
        callJSON("Imperial")
    }
    else if (param.id == "tempC") {
        document.getElementById(param.id).style.fontSize = "1.8em";
        document.getElementById("tempF").style.fontSize = "1em";
        callJSON("Metric")
    }
} 












