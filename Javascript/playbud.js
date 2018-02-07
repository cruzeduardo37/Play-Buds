//on page load, user is presented with a contact form
	
	//user completes form, click submit button
		//on submit grab name, email, and comments
		

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

		$(document).ready(function() {
			database.ref().on("child_added", function(snapshot) {
				var name = snapshot.val().name
				var email = snapshot.val().email
				var comments = snapshot.val().comments
										
		})//closing snapshot function

		$("#submitButton").on("click", function() {
			event.preventDefault()
				var name = $("#userName").val().trim();
				var email = $("#email").val().trim();
				var comments = $("#comments").val().trim();

				var userInfo = {
					name: name,
					email: email,
					comments: comments
				}//closing object
				console.log(userInfo)
				database.ref().push(userInfo);

				$("#userName").val("");
				$("#email").val("");
				$("#comments").val("");



		})//closing out submitButton function.
			

			})