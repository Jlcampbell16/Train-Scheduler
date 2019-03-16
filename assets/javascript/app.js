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
  var tTime = snapshot.val().time;
  var tFreq = snapshot.val().frequency;
  var tName = snapshot.val().name
  var tDest = snapshot.val().destination

  // calculations
  var timeConverted = moment(tTime, "HH:mm").subtract(1, "years");
  var timeDifference = moment().diff(moment(timeConverted), "minutes");
  var timeRemainder = timeDifference % tFreq;
  var minAway = tFreq - timeRemainder;
  var nextArrival = moment().add(minAway, "minutes");

  //add to the page
  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDest),
    $("<td>").text(tFreq),
    $("<td>").text(moment(nextArrival).format("hh:mm A")),
    $("<td>").text(minAway)
  )
  $("#trainTable > tbody").append(newRow);

}, function (errorObject) {
    console.log("Error Code: " + errorObject);
}); 