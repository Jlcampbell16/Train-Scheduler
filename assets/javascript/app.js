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

//-------------------------------------------------------------------------------
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

//-------------------------------------------------------------------------------
// add a new train on the next line -- NOT WORKING
  database.ref().on("child_added", function(snapshot){
  
    var newRow = $("<tr>").append(
     $("<td>").text(snapshot.val().name), 
     $("<td>").text(snapshot.val().destination), 
     $("<td>").text(snapshot.val().time), 
     $("<td>").text(snapshot.val().frequency), 
     $("<td>").text(snapshot.val().minAway) 
     
    )
    $("#trainTable > tbody").append(newRow);
    // $("#nameDisplay").append("<td>" +  + "</td>");
    // $("#destinationDisplay").append("<td>" + snapshot.val().destination + "</td>");
    // $("#frequencyDisplay").html("<td>" + snapshot.val().frequency + "</td>");
    // $("#arrivalDisplay").html("<td>" + snapshot.val().time + "</td>");
    // $("#minAwayDisplay").html("<td>" + snapshot.val().minAway + "</td>");
  });
//------------------------------------------------------------------------------- 
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