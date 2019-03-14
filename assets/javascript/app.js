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
  var time = ""; 
  var frequency = "";
  var minAway = 0;


  //on click of submit button
  $("#submitBtn").on("click", function (event){
    //prevent refresh of page
    event.preventDefault();

    //grab the input fields
    name = $("#nameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    time = $("#timeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
    //clear the input fields
    $(".form-control").val("");

    //push to database
    database.ref().push({ 
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP  //use this to create delete buttons
    });
  });

//   database.ref().on("child_added", function(snapshot){
//     $("#nameDisplay").text("<td>" + snapshot.val().name + "</td>");
//     $("#destinationDisplay").text("<td>" + snapshot.val().destination + "</td>");
//     $("#frequencyDisplay").text("<td>" + snapshot.val().frequency + "</td>");
//     $("#arrivalDisplay").text("<td>" + snapshot.val().time + "</td>");
//     $("#minAwayDisplay").text("<td>" + snapshot.val().minAway + "</td>");
//   })
  
  //snapshot & error
  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snapshot.val().frequency);

        //update HTML 
    $("#nameDisplay").text(snapshot.val().name);
    $("#destinationDisplay").text(snapshot.val().destination);
    $("#frequencyDisplay").text(snapshot.val().frequency);
    $("#arrivalDisplay").text(snapshot.val().time);
    $("#minAwayDisplay").text(snapshot.val().minAway);


  }, function(errorObject) {
        console.log("Error Code: " + errorObject);
  });