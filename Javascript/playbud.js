//firebase configuration
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

$(document).ready(function(){

	var gameToken = 0;

	//logout functionality
	$("#logout").click(function(error) {

		swal("You logged out");

		// firebase.auth().signOut().then(function() {
	 //  		console.log("signed out");
	 //  		window.location = "login.html";
		// }).catch(function(error) {
		//   console.log(error);
		// });	// error.message("try again");

	});


	// trivia game function

	$("#trivia-display").hide();

	function trivia() {

		var panel = $("#quiz-area");
		var countStartNumber = 60;

		// Question set
		var questions = [{
		  question: "What does THC stand for?",
		  answers: ["tetrahydrocannabinol", "terrapherbalcannabinoid", "treshydrocannabis", "terolhempcarbonate"],
		  correctAnswer: "tetrahydrocannabiol",
		}, {
		  question: "Which of these is NOT a commonly known name for marijuana?",
		  answers: ["ganja", "weed", "pot", "spice"],
		  correctAnswer: "spice, it is not cannabis and should not be consumed",
		}, {
		  question: "What is scientific name for the smokable portion of the cannabis plant?",
		  answers: ["calyx", "flower", "greens", "buds"],
		  correctAnswer: "calyx",
		}, {
		  question: "Which of these is the highest grossing stoner movie?",
		  answers: ["Up In Smoke", "Friday", "Fasttimes at Ridgemont High", "Pinapple Express"],
		  correctAnswer: "Pineapple Express",
		}, {
		  question: "Which was the first state to legalize the recreational use of marijuana?",
		  answers: ["Oregon", "Washington", "California", "Colorado"],
		  correctAnswer: "Oregon",
		}, {
		}];

		// Variable to hold our setInterval
		var timer;

		var game = {

		  questions: questions,
		  currentQuestion: 0,
		  counter: countStartNumber,
		  correct: 0,
		  incorrect: 0,

		  countdown: function() {
		    this.counter--;
		    $("#counter-number").text(this.counter);
		    if (this.counter === 0) {
		      console.log("TIME UP");
		      this.timeUp();
		    }
		  },

		  loadQuestion: function() {

		    timer = setInterval(this.countdown.bind(this), 1000);

		    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

		    panel.append("<div id='buttonWrapper'>");

		    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
		      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
		      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
		    };

		     panel.append("</div>");
		  },

		  nextQuestion: function() {
		    this.counter = window.countStartNumber;
		    $("#counter-number").text(this.counter);
		    this.currentQuestion++;
		    this.loadQuestion.bind(this)();
		  },

		  timeUp: function() {

		    clearInterval(window.timer);

		    $("#counter-number").text(this.counter);

		    panel.html("<h2>Out of Time!</h2>");
		    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);

		    if (this.currentQuestion === questions.length - 1) {
		      setTimeout(this.results, 3 * 1000);
		    }
		    else {
		      setTimeout(this.nextQuestion, 3 * 1000);
		    }
		  },

		  results: function() {

		    clearInterval(window.timer);

		    panel.html("<h2>All done, here is how you did!</h2>");

		    $("#counter-number").text(this.counter);

		    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
		    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
		    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
		    panel.append("<br><button id='start-over'>Start Over?</button>");
		  },

		  clicked: function(e) {
		    clearInterval(window.timer);
		    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
		      this.answeredCorrectly();
		    }
		    else {
		      this.answeredIncorrectly();
		    }
		  },

		  answeredIncorrectly: function() {

		    this.incorrect++;

		    clearInterval(window.timer);

		    panel.html("<h2>Nope!</h2>");
		    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
		   

		    if (this.currentQuestion === questions.length - 1) {
		      setTimeout(this.results.bind(this), 3 * 1000);
		    }
		    else {
		      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
		    }
		  },

		  answeredCorrectly: function() {

		    clearInterval(window.timer);

		    this.correct++;

		    panel.html("<h2>Correct!</h2>");
		  

		    if (this.currentQuestion === questions.length - 1) {
		      setTimeout(this.results.bind(this), 3 * 1000);
		    }
		    else {
		      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
		    }
		  },

		  reset: function() {
		    this.currentQuestion = 0;
		    this.counter = countStartNumber;
		    this.correct = 0;
		    this.incorrect = 0;
		    this.loadQuestion();
		  }
		};

		// CLICK EVENTS

		$(document).on("click", "#start-over", game.reset.bind(game));

		$(document).on("click", ".answer-button", function(e) {
		  game.clicked.bind(game, e)();
		});

		$(document).on("click", "#start", function() {
		  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>60</span> Seconds</h2>");
		  game.loadQuestion.bind(game)();
		});
	};

	// hangman game function


	// gif game function


	// On-click functionality for all three games

	$("#trivia-game").click(function(error) {

		error.preventDefault();

		$("#trivia-display").show();

		$("#game").html(trivia());

		gameToken += 25;

		console.log(gameToken);

	});


	$("#hangman-game").click(function(error) {

		error.preventDefault();

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


		gameToken += 25;

		$("#game").html(psychicGame());


		$("#trivia-display").hide();

	});


	$("#gif-game").click(function(error) {

		error.preventDefault();

		// $("#hangman-display").hide();
		// $("#gif-display").show();

		$("#game").append();

	});


});