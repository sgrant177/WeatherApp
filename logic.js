

$(document).ready(function (){
    var savedCity = window.localStorage.getItem("savedCity");


    var cityName = $("#userInput").val();
    var APIkey = "01f67e5f1bfa2571c8aa1274739633c6";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + savedCity + "&appid=" + APIkey
    var citySlot = $("#currentCity");
    var tempSlot = $("#temp");
    var windSlot = $("#windSpeed");
    var humiditySlot = $("#humidity");
    var iconSlot = $("#icon");
    var uvSlot = $("#UVIndex")
    window.localStorage.setItem("savedCity", cityName)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var currentTemp = Math.round(response.main.temp - 273.15) * 1.80 + 32;
        var currentHumidity = (response.main.humidity);
        var currentCity = (response.name);
        var currentWind = (response.wind.speed);
        var currentIcon = (response.weather[0].icon)
        var currentLon = (response.coord.lon);
        var currentLat = (response.coord.lat)
        var iconurl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
        var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + currentLat + "&lon=" + currentLon + "&appid=" + APIkey;

        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function (response) {
            var currentUV = response.value;
            uvSlot.text("UV Index: "+currentUV);
            if(currentUV <=2 ) { 
                uvSlot.css("color", "green");
            }
            if(currentUV > 2 & currentUV <= 5) {
                uvSlot.css("color", "gold");
            }
            if(currentUV > 5 & currentUV <= 7) {
                uvSlot.css("color", "orange");
            }
            else {
                uvSlot.css("color", "red");
            }
            
        })
        citySlot.text(currentCity);
        tempSlot.text("Temp: " + currentTemp + " F°");
        windSlot.text("Wind: " + currentWind + " MPH");
        humiditySlot.text("Humidity: " + currentHumidity + " %");
        iconSlot.attr("src", iconurl);
    })

    $("#search").on("click", function () {
        var cityName = $("#userInput").val();
        var APIkey = "01f67e5f1bfa2571c8aa1274739633c6";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey
        var citySlot = $("#currentCity");
        var tempSlot = $("#temp");
        var windSlot = $("#windSpeed");
        var humiditySlot = $("#humidity");
        var cityList = $("#citylist");
        var iconSlot = $("#icon");
        var uvSlot = $("#UVIndex")
        var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" +  APIkey
        window.localStorage.setItem("savedCity", cityName)
        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.list[0].main.temp_max);
            console.log(response.list[0].weather.icon)
        })

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var currentTemp = Math.round(response.main.temp - 273.15) * 1.80 + 32;
            var currentHumidity = (response.main.humidity);
            var currentCity = (response.name);
            var currentWind = (response.wind.speed);
            var currentIcon = (response.weather[0].icon)
            var currentLon = (response.coord.lon);
            var currentLat = (response.coord.lat)
            var iconurl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + currentLat + "&lon=" + currentLon + "&appid=" + APIkey;
    
            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function (response) {
                var currentUV = response.value;
                uvSlot.text("UV Index: "+currentUV);
                
                if(currentUV <=2 ) { 
                    uvSlot.css("color", "green");
                }
                if(currentUV > 2 & currentUV <= 5) {
                    uvSlot.css("color", "gold");
                }
                if(currentUV > 5 & currentUV <= 7) {
                    uvSlot.css("color", "orange");
                }
                else {
                    uvSlot.css("color", "red");
                }
            });
    
            
    
            citySlot.text(currentCity);
            tempSlot.text("Temp: " + currentTemp + " F°");
            windSlot.text("Wind: " + currentWind + " MPH");
            humiditySlot.text("Humidity: " + currentHumidity + " %");
            iconSlot.attr("src", iconurl);
    
            var cityButton = $("<button>")
            cityButton.attr("class", "list-group-item")
            cityButton.text(cityName);
            cityButton.attr("id", cityName)
            cityList.append(cityButton);
    
            $(document).on("click", ".list-group-item", function () {
                var city = $(this).attr("id");
                var APIkey = "01f67e5f1bfa2571c8aa1274739633c6";
                var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey
                var citySlot = $("#currentCity");
                var tempSlot = $("#temp");
                var windSlot = $("#windSpeed");
                var humiditySlot = $("#humidity");
                var iconSlot = $("#icon");
    
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    var currentTemp = Math.round(response.main.temp - 273.15) * 1.80 + 32;
                    var currentHumidity = (response.main.humidity);
                    var currentCity = (response.name);
                    var currentWind = (response.wind.speed);
                    var currentIcon = (response.weather[0].icon)
                    var iconurl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
    
                    citySlot.text(currentCity);
                    tempSlot.text("Temp: " + currentTemp + " F°");
                    windSlot.text("Wind: " + currentWind + " MPH");
                    humiditySlot.text("Humidity: " + currentHumidity + " %");
                    iconSlot.attr("src", iconurl);
                })
            });
        });
    });
})

