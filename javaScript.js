


// var clientDd = "TPKPQAPUEUIJXVRZE1LKTJ2PPNBEHUBAD3LKXDIOTXGGIKKZ"
// var clientSecret = "3H45J3FEI2SRFIX5ONNIMED31NJGJATZRBSIHS5CIQZJV3KQ"
// var queryURL = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=TPKPQAPUEUIJXVRZE1LKTJ2PPNBEHUBAD3LKXDIOTXGGIKKZ&client_secret=3H45J3FEI2SRFIX5ONNIMED31NJGJATZRBSIHS5CIQZJV3KQ&v=20200620";

// console.log("hello")
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }) .then(function(response){
//     console.log(response)
// })


$(document).ready(function () {
  $('select').formSelect();

  //Add autocomplete functionality to our search input text field
  var input = document.getElementById('pac-input');
  autocomplete = new google.maps.places.Autocomplete(input);


  // Send Requests when user clicks "search"
  $(".searchBtn").on("click", function (event) {
    event.preventDefault();

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
        var runningURL = "https://www.trailrunproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=10&key=200808437-fc87acc5b1a3694eb83d3a30cc324456";
        $.ajax({
          url: runningURL,
          method: "GET"
        }).then(function (res) {

          // Log all trails in response
          console.log(res);

        });
      });

    }

  });

});

