// Initialize Firebase
var config = {
  apiKey: "AIzaSyC6JPMdC6buE71-70AmYEBp51kIn18aokQ",
  authDomain: "add-train-schedules.firebaseapp.com",
  databaseURL: "https://add-train-schedules.firebaseio.com",
  projectId: "add-train-schedules",
  storageBucket: "add-train-schedules.appspot.com",
  messagingSenderId: "449691392812"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var time = "00:00";
var frequency = 0;


//-------------------------------------------------------------------------------
// on click of submit button
$("#submitBtn").on("click", function (event) {
  // prevent refresh of page
  event.preventDefault();

  // grab the input fields
  name = $("#nameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  time = $("#timeInput").val().trim();
  frequency = $("#frequencyInput").val().trim();

  // clear the input fields
  $(".form-control").val("");

  // push to database
  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP  //use this to create delete buttons
  });
});

//-------------------------------------------------------------------------------
// add a new train on the next line 
// anytime a new train is added add it to the snapshot
database.ref().on("child_added", function (snapshot) {

  // calculations
  var timeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log("time converted: " + timeConverted);

  // var currentTime = moment();
  //   console.log("current time: " + moment(currentTime).format("hh:mm A"));

  var timeDifference = moment().diff(moment(timeConverted), "minutes");
    console.log("time difference: " + timeDifference);

  var timeRemainder = timeDifference % frequency; //NOT WORKING
    console.log("time remainder: " + timeRemainder);

  var minAway = frequency - timeRemainder; // NOT WORKING
    console.log("minutes away: " + minAway);

  var nextArrival = moment().add(minAway, "minutes"); //NOT WORKING
    console.log("next train arrival time: " + moment(nextArrival).format("hh:mm A"));

  var trnName = snapshot.val().name
  var trnDest = snapshot.val().destination
  // var trnTime = snapshot.val().time
  var trnFreq = snapshot.val().frequency


  var newRow = $("<tr>").append(
    $("<td>").text(trnName),
    $("<td>").text(trnDest),
    $("<td>").text(trnFreq),
    $("<td>").text(moment(nextArrival).format("hh:mm A")),
    $("<td>").text(minAway)

  )
  $("#trainTable > tbody").append(newRow);

}); //DOES THE ERROR GO HERE? 

//------------------------------------------------------------------------------- 
// snapshot & error  -- DO I STILL NEED THIS SECTION? 
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
  // console.log(snapshot.val().name);
  // console.log(snapshot.val().destination);
  // console.log(snapshot.val().time);
  // console.log(snapshot.val().frequency);



}, function (errorObject) {
  console.log("Error Code: " + errorObject);
});

//------------------------------------------------------------------------------- 


