


 var clientId = "TPKPQAPUEUIJXVRZE1LKTJ2PPNBEHUBAD3LKXDIOTXGGIKKZ"
 var clientSecret = "3H45J3FEI2SRFIX5ONNIMED31NJGJATZRBSIHS5CIQZJV3KQ"
 var currentDate = moment().format("YYYYMMDD")







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