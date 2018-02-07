$(document).ready(function(){

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


		$("#logout").click(function(error) {

			swal("You logged out");
			// error.message("try again");
			
			firebase.auth().signOut().then(function() {
                  console.log("signed out");
                  window.location = "index.html";
            }).catch(function(error) {
              console.log(error);
            });

		});

		var userName = $("<li>");
		userName.attr("id", "user-Name");
		$(".nav navbar-nav navbar-right").append(userName);

		database.ref().on("value", function(snapshot){
			
			userName = snapshot.child(loginName);
			console.log(userName);

		})


});


	// trivia game function

	// hangman game function


	// gif game function



		$("#trivia-game").click(function(error) {

			error.preventDefault();

			console.log("trivia game");

				function psychicGame() {
				var compGuess = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; 
						 
				//function randomly selecting in the array compGuess		 
				function compCalc(num) {
					return compGuess[Math.floor(Math.random() * compGuess.length)];
				};

				console.log(compCalc());

				var win = 0;
				var loss = 0;
				var guess = 10;
				var userGuessSoFar = [];
						
				//------------------document.onkeyup-----------------//
				document.onkeyup = function(event) {

					var userPress = String.fromCharCode(event.keyCode).toLowerCase();
					userGuessSoFar.push(userPress); //pushes the user's input into the empty array userGuessSoFar

				//conditional statement comparing a user's input to the computer's guess
					if (compGuess.includes(userPress)) {

						if (userPress === compCalc()) {
							userGuessSoFar = [];
							guess = 10;
							win++;

							var winDisplay = $("<h4>");

							winDisplay.addClass("win");

							winDisplay.append("wins " + win);

							$("#game").append(winDisplay);
							// document.getElementById("win").textContent = win;
							alert("You Win!");
							
						}
						else if (userPress){
							guess--;
							// document.getElementById("guessLeft").textContent = guess;
							// document.getElementById("userGuess").textContent = userPress;

							var guessDisplay = $("<h4>");
							var press = $("<h4>");

							guessDisplay.addClass("guess");
							press.addClass("press");

							guessDisplay.append(guess);
							press.append(userPress);
							
							$("#game").append(press + guessDisplay);


							if (guess == 0) {
								guess = 10;
								loss++;
								// document.getElementById("loss").textContent = loss;				
							
								var lossDisplay = $("<h4>");

								lossDisplay.addClass("loss");

								lossDisplay.append("losses " + loss);

								$("#game").append(lossDisplay);

								alert("You lose, try again!");
					
							}		
						}
						if (userGuessSoFar[9]) {
							userGuessSoFar = [];
						}							
					}
					else {
						alert("please press a letter!")
					}

					var guessesDisplay = $("<h4>");

					guessesDisplay.addClass("display");

					JSON.stringify(guessesDisplay.append(userGuessSoFar));

					$("#game").append(guessDisplay);

					// JSON.stringify(attempt);

					console.log(userGuessSoFar);


					// document.getElementById("guessDisplay").textContent = userGuessSoFar;
			};
			};

			var placeholder = "trivia game";

			$("#game").append(psychicGame());

			// JSON.stringify($("#game").append(psychicGame()));
		

		});


		$("#hangman-game").click(function(error) {

			error.preventDefault();

			console.log("hangman game");
			var placeholder = "hangman game";

			$("#game").append(placeholder);

		});


		$("#gif-game").click(function(error) {

			error.preventDefault();

			console.log("gif game");
			var placeholder = "gif game";

			$("#game").append(placeholder);

		});


	// });
// © 2018 GitHub, Inc.
// Terms
// Privacy
// Security
// Status
// Help
// Contact GitHub
// API
// Training
// Shop
// Blog
// About