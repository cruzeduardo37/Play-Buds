
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC88_St96Uq1brN70-AwlzPaDn7I39I3sU",
    authDomain: "playbud-36dab.firebaseapp.com",
    databaseURL: "https://playbud-36dab.firebaseio.com",
    projectId: "playbud-36dab",
    storageBucket: "playbud-36dab.appspot.com",
    messagingSenderId: "936777210354"
  };
  firebase.initializeApp(config);

 var database = firebase.database();


$("#signUpForm").on("submit", function(event){

	console.log("hello")
	event.preventDefault();

	// var dataValues = $(this).serializeArray();

	var name = $("#name-input").val().trim();
	var email = $("#email-input").val().trim();
	var password = $("#password-input").val().trim();


	database.ref().push({
		name: name,
		email: email,
		password: password,

		dateAdded: firebase.database.ServerValue.TIMESTAMP

	});

});

$("#signUp, #get-started, #get-started2").on("click", function(event){


	$(".modal-container").toggleClass("hidden")
});

// $("#modal-button").on("click", function(event){

// });

// signup.addEventListener("click", error => {
// 	  var email = document.getElementById("email").value;
// 	  var password =  document.getElementById("password").value;
// 	  var auth = firebase.auth();

// 	  if (email.length < 4) {
// 	  	alert("Please enter a valid email address");
// 	  	return;
// 	  }
// 	  else if (password.length < 5) {
// 	  	alert("Please enter a valid password");
// 	  	return;
// 	  }	

// 	  var promise = auth.createUserWithEmailAndPassword(email, password)

// 	  promise.catch(error => console.log(error.message));
// });


// login.addEventListener("click", error => {
// 	  var email = document.getElementById("email").value;
// 	  var password =  document.getElementById("password").value;
// 	  var auth = firebase.auth();

// 	  if (email.length < 4) {
// 	  	alert("Please enter a valid email address");
// 	  	return;
// 	  }
// 	  else if (password.length < 5) {
// 	  	alert("Please enter a valid password");
// 	  	return;
// 	  }	

// 	  var promise = auth.signInWithEmailAndPassword(email, password)

// 	  promise.catch(error => console.log(error.message));
// });

// firebase.auth().onAuthStateChanged(firebaseUser => {

// 	if (firebaseUser) {
// 		console.log(firebaseUser);
// 		window.location = "index.html";
// 	}
// 	else {
// 		console.log("Not logged in");
// 	}

// });