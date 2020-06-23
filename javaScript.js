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

        var climbingURL = "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" + lat + "&lon=" + long + "&maxResults=40&key=200808437-5c194f26f18e2d8e6eb6bbb14913e599";

        // If user chose rock climbing, get climbing sites
        if(filter ==="Rock Climbing"){
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
              if(routes[index].imgMedium != "") {
                var climbCardCol = $('<div class="col s4 m4 l4">');
                var climbCardCard = $('<div class="card">');
                var climbCardImgDiv = $('<div class="card-image">');
                var climbCardImg = $('<img>');
                climbCardImg.attr("src", routes[index].imgMedium);
                var climbCardTitle = $('<span class="card-title picTitle">');
                climbCardTitle.text(routes[index].name);
                var climbCardTextDiv = $('<div class="card-content">');
                var climbCardLocation = $('<p class="cardLocation">')
                climbCardLocation.text(routes[index].location[0]);
                var climbCardText = $('<p class=""></p>');
                climbCardText.text("Type of climb: " +routes[index].type)
      
                var climbCardLinkDiv = $('<div class="card-action">')
                var climbCardLink = $('<a class="" href="#">Learn More</a>');
                climbCardLink.attr("href", routes[index].url);
                climbCardLink.attr("target", "_blank");
                climbCardCol.append(climbCardCard);
                climbCardCard.append(climbCardImgDiv);
                climbCardImgDiv.append(climbCardImg);
                climbCardImgDiv.append(climbCardTitle);
                climbCardCard.append(climbCardTextDiv);
                climbCardTextDiv.append(climbCardLocation);
                climbCardTextDiv.append(climbCardText);
                climbCardCard.append(climbCardLinkDiv);
                climbCardLinkDiv.append(climbCardLink);
              
                $("#results").append(climbCardCol);
              } else{
                var climbCardDiv = $('<div class=""></div>');
                var climbCardCol = $('<div class="col s4 m4 l4">');
                var climbCardCard = $('<div class="card">');
                var climbCardTitle = $('<span class="card-title noPicTitle">');
                climbCardTitle.text(routes[index].name);
                var climbCardTextDiv = $('<div class="card-content">');
                var climbCardLocation = $('<p class="cardLocation"></p>');
                climbCardLocation.text(routes[index].location[0]);
                var climbCardText = $('<p></p>');
                climbCardText.text("Type of climb: " + routes[index].type);
                var climbCardLinkDiv = $('<div class="card-action">')
                var climbCardLink = $('<a href="#">Learn More</a>');
                climbCardLink.attr("href", routes[index].url);
                climbCardLink.attr("target", "_blank");
                climbCardCol.append(climbCardCard);
                climbCardCard.append(climbCardTitle);
                climbCardCard.append(climbCardTextDiv);
                climbCardTextDiv.append(climbCardLocation);
                climbCardTextDiv.append(climbCardText);
                climbCardCard.append(climbCardLinkDiv);
                climbCardLinkDiv.append(climbCardLink);
                $("#results").append(climbCardCol);

              }

            });

          });


      // else if user chose running, get running trails in area
      } 
      
      else if(filter ==="Running"){
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
            if(runningTrails[index].imgMedium != "") {
              var runCardCol = $('<div class="col s4 m4 l4">');
              var runCardCard = $('<div class="card">');
              var runCardImgDiv = $('<div class="card-image">');
              var runCardImg = $('<img>');
              runCardImg.attr("src", runningTrails[index].imgMedium);
              var runCardTitle = $('<span class="card-title picTitle">');
              runCardTitle.text(runningTrails[index].name);
              var runCardTextDiv = $('<div class="card-content">');
              var runCardLocation = $('<p class="cardLocation">')
              runCardLocation.text(runningTrails[index].location);
              var runCardText = $('<p class=""></p>');
              runCardText.text(runningTrails[index].summary)
              
              var runCardDistance = $('<p class="distance"></p>');
              runCardDistance.text(runningTrails[index].length + " miles");
              var runCardLinkDiv = $('<div class="card-action">')
              var runCardLink = $('<a class="" href="#">Learn More</a>');
              runCardLink.attr("href", runningTrails[index].url);
              runCardLink.attr("target", "_blank");
              runCardCol.append(runCardCard);
              runCardCard.append(runCardImgDiv);
              runCardImgDiv.append(runCardImg);
              runCardImgDiv.append(runCardTitle);
              runCardCard.append(runCardTextDiv);
              runCardTextDiv.append(runCardLocation);
              runCardTextDiv.append(runCardText);
              runCardTextDiv.append(runCardDistance);
              runCardCard.append(runCardLinkDiv);
              runCardLinkDiv.append(runCardLink);
            
              $("#results").append(runCardCol);
            } else{
              var runCardDiv = $('<div class=""></div>');
              var runCardCol = $('<div class="col s4 m4 l4">');
              var runCardCard = $('<div class="card">');
              var runCardTitle = $('<span class="card-title noPicTitle">');
              runCardTitle.text(runningTrails[index].name);
              var runCardTextDiv = $('<div class="card-content">');
              var runCardLocation = $('<p class="cardLocation"></p>');
              runCardLocation.text(runningTrails[index].location);
              var runCardText = $('<p></p>');
              runCardText.text(runningTrails[index].summary)
              var runCardLinkDiv = $('<div class="card-action">')
              var runCardLink = $('<a href="#">Learn More</a>');
              runCardLink.attr("href", runningTrails[index].url);
              runCardLink.attr("target", "_blank");
              runCardCol.append(runCardCard);
              runCardCard.append(runCardTitle);
              runCardCard.append(runCardTextDiv);
              runCardTextDiv.append(runCardLocation);
              runCardTextDiv.append(runCardText);
              runCardCard.append(runCardLinkDiv);
              runCardLinkDiv.append(runCardLink);
              $("#results").append(runCardCol);

            }
        
            
             
          });


        });
      }
      });

    }

  });

});