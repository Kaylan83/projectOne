
$(document).ready(function () {
  $('select').formSelect();


<<<<<<< HEAD
 var clientId = "TPKPQAPUEUIJXVRZE1LKTJ2PPNBEHUBAD3LKXDIOTXGGIKKZ"
 var clientSecret = "3H45J3FEI2SRFIX5ONNIMED31NJGJATZRBSIHS5CIQZJV3KQ"
 var currentDate = moment().format("YYYYMMDD")




=======
  //Add autocomplete functionality to our search input text field
  var input = document.getElementById('pac-input');
  autocomplete = new google.maps.places.Autocomplete(input);
>>>>>>> f9804b587276c51d4ec29d37253ec1f465fa72ae


  // Send Requests when user clicks "search"
  $(".searchBtn").on("click", function (event) {
    event.preventDefault();
    $("#results").empty();

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
        
        // add lat and long to running trails request url
        var runningURL = "https://www.trailrunproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxResults=20&key=200808437-fc87acc5b1a3694eb83d3a30cc324456";
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
              var runCardCol = $('<div class="col s4 m4 l4 ">');
              var runCardCard = $('<div class="card ">');
              var runCardImgDiv = $('<div class="card-image ">');
              var runCardImg = $('<img>');
              runCardImg.attr("src", runningTrails[index].imgMedium);
              var runCardTitle = $('<span class="card-title picTitle ">');
              runCardTitle.text(runningTrails[index].name);
              var runCardTextDiv = $('<div class="card-content ">');
              var runCardLocation = $('<p class="cardLocation ">')
              runCardLocation.text(runningTrails[index].location);
              var runCardText = $('<p class=""></p>');
              runCardText.text(runningTrails[index].summary)
              var runCardDistance = $('<p class="distance "></p>');
              runCardDistance.text(runningTrails[index].length + " miles");
              var runCardLinkDiv = $('<div class="card-action ">')
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
      });

    }

<<<<<<< HEAD
$(document).ready(function(){
    $('select').formSelect();
   
$("a").on("click", function (event) {

    event.preventDefault();
    var userInput = $("#city").val();
    var queryURL = "https://api.foursquare.com/v2/venues/explore?" + "mode=url" + "&near=" + userInput + "&client_id=" + clientId + "&client_secret=" + clientSecret +"&v=20200621";
    var weatherURL = "https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sunnyvale";

    
    console.log(userInput)


    $.ajax({
        url: queryURL,
        method: "GET"
    }) .then(function(response){
       // console.log(response)
    });



    $.ajax({
        url: weatherURL,
        method: "GET"
    }) .then(function(response){
        console.log(response)
    });
});





  });
//Dallas, TX, USA
=======
  });

});

>>>>>>> f9804b587276c51d4ec29d37253ec1f465fa72ae
