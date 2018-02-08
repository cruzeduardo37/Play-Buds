



(function(){

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

	var login = document.getElementById("signin-modal-button");

	
	$("#sign-up-form").submit(function (event) {
		event.preventDefault();
	    var email = document.getElementById("email-input-signup").value;
	    var password =  document.getElementById("password-input-signup").value;
	    var name = document.getElementById("name-input-signup").value

	    database.ref().push({
	    	loginName: name,
	    	dateAdded: firebase.database.ServerValue.TIMESTAMP

	    });

	    var auth = firebase.auth();

	    if (email.length < 0) {
	    	alert("Please enter a valid email address");
	    	return;
	    };
	    if ($("#cancelBtn").on("click")) {
	    	window.location = "index.html";
	    };
	    if (password.length < 5) {
	    	alert("Please enter a valid password");
	    	return;
	    };

	    var promise = auth.createUserWithEmailAndPassword(email, password);

	    promise.catch(error => console.log(error.message));
	});

	

	$("#sign-in-form").submit(function (event) {
		event.preventDefault();
	    var email = document.getElementById("email-input-login").value;
	    var password =  document.getElementById("password-input-login").value;
	    var auth = firebase.auth();

	    // if (email.length < 4) {
	    // 	alert("Please enter a valid email address");
	    // 	return;
	    // }
	    // else if (password.length < 5) {
	    // 	alert("Please enter a valid password");
	    // 	return;
	    // }

	    var promise = auth.signInWithEmailAndPassword(email, password);

	    promise.catch(error => console.log(error.message));
	});

	firebase.auth().onAuthStateChanged(firebaseUser => {

			if (firebaseUser) {
				console.log(firebaseUser);
				window.location = "game.html";
			}
			else {
				console.log("Not logged in");
			}
		});
		

}());





$("#signUp, #get-started, #get-started2, #submitBtn, #cancelBtn").on("click", function(event){


	$(".signup-modal-container").toggleClass("hidden")


});

$("#login").on("click", function(event){

	$(".signin-modal-container").toggleClass("hidden1");

});





// 		login.addEventListener("click", event => {
// 			event.preventDefault();
// 			  var email = document.getElementById("email").value;
// 			  var password =  document.getElementById("password").value;
// 			  var auth = firebase.auth();

// 			  if (email.length < 4) {
// 			  	alert("Please enter a valid email address");
// 			  	return;
// 			  }
// 			  else if (password.length < 5) {
// 			  	alert("Please enter a valid password");
// 			  	return;
// 			  }	

// 			  var promise = auth.signInWithEmailAndPassword(email, password)

// 			  promise.catch(error => console.log(error.message));
// 		});


// 	var signup = document.getElementById("signup-modal-button");

// 		signup.addEventListener("click", error => {
			

// 			var email = document.getElementById("email-input").value;
// 			var password =  document.getElementById("password-input").value;
// 			var auth = firebase.auth();

// 				// if (email.length < 4) {
// 				// 	alert("Please enter a valid email address");
// 				// 	return;
// 				// }
// 				// else if (password.length < 5) {
// 				// 	alert("Please enter a valid password");
// 				// 	return;
// 				// }	

// 			var promise = auth.createUserWithEmailAndPassword(email, password);

// 				promise
// 				  .catch(error => console.log(error.message));
// 			});

		





// $("#signUpForm").on("submit", function(event){

// 	console.log("hello")
// 	event.preventDefault();

// 	// var dataValues = $(this).serializeArray();

// 	var name = $("#name-input").val().trim();
// 	var email = $("#email-input").val().trim();
// 	var password = $("#password-input").val().trim();


// 	database.ref().push({
// 		name: name,
// 		email: email,
// 		password: password,

// 		dateAdded: firebase.database.ServerValue.TIMESTAMP

// 	});

// });



// $("#modal-button").on("click", function(event){

// });

// $("#signUpForm").on("submit", function(event){

	// var name = $("#name-input").val().trim();
	// var email = $("#email-input").val().trim();
	// var password = $("#password-input").val().trim();

// });