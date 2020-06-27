$(document).ready(function () {

  $('select').formSelect();


  //Add autocomplete functionality to our search input text field
  var input = document.getElementById('pac-input');
  autocomplete = new google.maps.places.Autocomplete(input);


  // Send Requests when user clicks "search"
  $(".searchBtn").on("click", function (event) {
    event.preventDefault();

    // Clear page from last search
    $("#results").empty();
    // $("#weather").empty();


    // Set filter var to activity user chose
    console.log($(".select-dropdown").val());
    var filter = $(".select-dropdown").val();

    // Set var location equal to location selected by user from autocomplete list
    var location = $("#pac-input").val();

    // If search field empty tell user to fill it in, otherwise send search
    if (location == "") {
      alert("Enter location");
    } else {
      console.log("Place chosen:" + location);
      // take addresss and replace spaces with plus sign since this is the format google api requires
      var address = location.split(' ').join('+');

      // add address to request url
      var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCyJX-Kt-KlymneRkWUnMjVk1KrA3bwCD0";

      // Google maps ajax request
      $.ajax({
        url: googleURL,
        method: "GET"
      }).then(function (Response) {
        //set var coordinates equal to coordinates object provided by google api
        var coordinates = Response.results[0].geometry.location;

        // log Latitude and Longitude of selected location
        console.log("Lat: " + coordinates.lat);
        console.log("Long: " + coordinates.lng);

        // Running Trails api request
        //Set lat and long equal to latitude and longitude from google's coordinates object
        var lat = coordinates.lat;
        var long = coordinates.lng;


        var weatherAPI = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=b8a12898806019a6178b169c5ea6f245" + "&units=imperial";


        $.ajax({
          url: weatherAPI,
          method: "GET"
        }).then(function (response) {
          console.log(response)


          var temp = (response.main.temp);
          var feelsLike = (response.main.feels_like);
          var tempMax = (response.main.temp_max);
          var tempMin = (response.main.temp_min);
          var humidity = response.main.humidity;

          $("#dump").empty();

          $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
          $("#temp").append("Temp <br>" + temp);
          $("#feelsLike").append("Feels <br>" + feelsLike);
          $("#max").append("Max <br>" + tempMax);
          $("#min").append("Min <br>" + tempMin);
          $("#humidity").append("Humidity <br>" + humidity + "%");
          $("#weather").attr("style", "visibility:visible");
        });

        var climbingURL = "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" + lat + "&lon=" + long + "&maxResults=40&key=200808437-5c194f26f18e2d8e6eb6bbb14913e599";

        // If user chose rock climbing, get climbing sites
        if (filter === "Rock Climbing") {
          $.ajax({
            url: climbingURL,
            method: "GET"
          }).then(function (res) {

            // Log all trails in response
            console.log(res.routes);
            var routes = res.routes;

            $.each(routes, function (index, value) {

              // For each climbing route construct a card containing its information and append it to results div 
              // If route has no pictures, construct it differently
              if (routes[index].imgMedium != "") {
                makePictureCard(routes[index].name, routes[index].imgMedium, routes[index].url, routes[index].location, routes[index].summary, "", routes[index].type);

              } else {
                makeNoPictureCard(routes[index].name, routes[index].url, routes[index].location, routes[index].summary, "", routes[index].type);

              }

            });

          });

          // else if user chose running, get running trails in area

        } else if (filter === "Running") {

          // add lat and long to running trails request url
          var runningURL = "https://www.trailrunproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxResults=40&key=200808437-fc87acc5b1a3694eb83d3a30cc324456";
          $.ajax({
            url: runningURL,
            method: "GET"
          }).then(function (res) {

            // Log all trails in response
            console.log(res.trails);
            var runningTrails = res.trails;

            $.each(runningTrails, function (index, value) {

              // For each running trail construct a card containing its information and append it to results div 
              // If trail has no pictures, construct it differently

              if (runningTrails[index].imgMedium != "") {
                makePictureCard(runningTrails[index].name, runningTrails[index].imgMedium, runningTrails[index].url, runningTrails[index].location, runningTrails[index].summary, runningTrails[index].length, "")

              } else {
                makeNoPictureCard(runningTrails[index].name, runningTrails[index].url, runningTrails[index].location, runningTrails[index].summary, runningTrails[index].length, "");

              }

            });


          });
        } else if (filter === "Biking") {
          // add lat and long to running trails request url
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?per_page=40&lat=" + lat + "&lon=" + long + "",
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
              "x-rapidapi-key": "a2bf636d02msh0285b0bad0d167cp1bad37jsn53ce1d57c625"
            }
          }

          $.ajax(settings).done(function (response) {

            // Log all bike trails in response
            console.log(response);
            var bikeTrails = response.data;


            $.each(bikeTrails, function (index, value) {

              // For each biking trail construct a card containing its information and append it to results div 
              // If trail has no pictures, construct it differently
              if (bikeTrails[index].thumbnail != "") {
                var bikeLocation = bikeTrails[index].city + ", " + bikeTrails[index].region;
                makePictureCard(bikeTrails[index].name, bikeTrails[index].thumbnail, bikeTrails[index].url, bikeLocation, bikeTrails[index].description, bikeTrails[index].length, "")


              } else {
                var bikeLocation = bikeTrails[index].city + ", " + bikeTrails[index].region;
                makeNoPictureCard(bikeTrails[index].name, bikeTrails[index].url, bikeLocation, bikeTrails[index].description, bikeTrails[index].length, "");

              }

            });
          });

        }
      });

    }

  });

  function makeNoPictureCard(name, url, location, description, length, type) {
    console.log("no pictures");
    var CardCol = $('<div class="col s4 m4 l4 offset-s3">');
    var CardCard = $('<div class="card ">');
    var CardTitle = $('<span class="card-title noPicTitle">');
    CardTitle.text(name);
    var CardTextDiv = $('<div class="card-content" id="over">');
    var CardLocation = $('<p class="cardLocation"></p>');
    CardLocation.text(location);
    var CardText = $('<p></p>');
    CardText.text(description)
    var CardDistance = $('<p class="distance"></p>');
    if (length === "") {
      CardDistance.text("Type of climb: " + type);
    } else if (type === "") {
      CardDistance.text(length + " miles");
    }
    var CardLinkDiv = $('<div class="card-action">')
    var CardLink = $('<a href="#">Learn More</a>');
    CardLink.attr("href", url);
    CardLink.attr("target", "_blank");
    CardCol.append(CardCard);
    CardCard.append(CardTitle);
    CardCard.append(CardTextDiv);
    CardTextDiv.append(CardLocation);
    CardTextDiv.append(CardText);
    CardTextDiv.append(CardDistance);
    CardCard.append(CardLinkDiv);
    CardLinkDiv.append(CardLink);
    $("#results").append(CardCol);
  }

  function makePictureCard(name, picture, url, location, description, length, type) {
    console.log("I'm making cards");

    // For each running trail construct a card containing its information and append it to results div 
    // If trail has no pictures, construct it differently
    var CardCol = $('<div class="col s4 m4 l4 offset-s3">');
    var CardCard = $('<div class="card ">');
    var CardImgDiv = $('<div class="card-image">');
    var CardImg = $('<img>');
    CardImg.attr("src", picture);
    var CardTitle = $('<span class="card-title picTitle">');
    CardTitle.text(name);
    var CardTextDiv = $('<div class="card-content" id="over">');
    var CardLocation = $('<p class="cardLocation">')
    CardLocation.text(location);
    var CardText = $('<p class=""></p>');
    CardText.text(description);

    var CardDistance = $('<p class="distance"></p>');
    if (length === "") {
      CardDistance.text("Type of climb: " + type);
    } else if (type === "") {
      CardDistance.text(length + " miles");
    }
    var CardLinkDiv = $('<div class="card-action">')
    var CardLink = $('<a class="" href="#">Learn More</a>');
    CardLink.attr("href", url);
    CardLink.attr("target", "_blank");
    CardCol.append(CardCard);
    CardCard.append(CardImgDiv);
    CardImgDiv.append(CardImg);
    CardImgDiv.append(CardTitle);
    CardCard.append(CardTextDiv);
    CardTextDiv.append(CardLocation);
    CardTextDiv.append(CardText);
    CardTextDiv.append(CardDistance);
    CardCard.append(CardLinkDiv);
    CardLinkDiv.append(CardLink);
    $("#results").append(CardCol);
  }

});