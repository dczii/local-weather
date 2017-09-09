window.onload = function () {
    document.getElementById("icon1").style.display = 'none';
    getLocation("Metric");
    setIcon();
}

var temp = "Metric";
var defaultCity = ""

function getLocation (temp) {
	if (navigator.geolocation) {
		$.get("https://ipapi.co/json", function(data) {
            defaultCity = data.city
            getWeather(data.city, temp);
        });
    } else { 
        document.getElementById("weather").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getWeather (city, temp) {
	var api = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=" + temp;
    var appid = "&APPID=061f24cf3cde2f60644a8240302983f2";
    var $http = api + city + units + appid;
    $.getJSON($http, function(data) {
        updateWeather(data);
    });   
}

function updateWeather (position) {
    //set Icon
    document.getElementById("icon1").style.display = 'block';
    document.getElementById("city").style.display = 'block';
    document.getElementById("icon2").style.display = 'none';
    setIcon()
    //Set weather name and temp
    document.getElementById("weather_temp").innerHTML = Math.round(position.main.temp);
    document.getElementById("weather_city").innerHTML = position.name + ", " + position.sys.country;
    document.getElementById("weather_city").value = position.name + ", " + position.sys.country;
    //Set Icon Weather
    let weather = position.weather[0].description;
    if(weather.indexOf("rain") >= 0) {
        setIcon(Skycons.RAIN)
        document.body.style.background = "#616161 url('https://wallpapercave.com/wp/wxHBbSq.jpg') no-repeat";
    }
    else if (weather.indexOf("sunny") >= 0) {
        setIcon(Skycons.CLEAR_DAY)
        document.body.style.background = "#616161 url('http://7-themes.com/data_images/collection/9/4505433-sunny-day-wallpapers.jpg') no-repeat";
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
        temp = "Imperial";
        document.getElementById(param.id).style.fontSize = "1.8em";
        document.getElementById("tempC").style.fontSize = "1em";
        getWeather(defaultCity, temp);
    }
    else if (param.id == "tempC") {
        temp = "Metric";
        document.getElementById(param.id).style.fontSize = "1.8em";
        document.getElementById("tempF").style.fontSize = "1em";
        getWeather(defaultCity, temp)
    }
} 


$(document).ready(function() {
    $("#location").on("click", function() {
        defaultCity = $('#city').val() 
        getWeather(defaultCity, temp)
    });

});









