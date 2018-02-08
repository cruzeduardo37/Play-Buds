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

	firebase.auth().onAuthStateChanged(function(user) {
	 window.user = user; // user is undefined if no user signed in
	 console.log("worked");
	 console.log(user);
	});

	var gameToken = 0;

	//logout functionality
	$("#logout").click(function(error) {

		swal("You logged out");

		firebase.auth().signOut().then(function() {
	  		console.log("signed out");
	  		window.location = "index.html";
		}).catch(function(error) {
		  console.log(error);
		});

	});


	// trivia game function

	$("#trivia-display").hide();
	$("#hangman-display").hide();

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

		      console.log(questions);
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

		    gameToken += 10;

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
		  },

		  image: function() {
		  	//code will go here
		  }
		};

		// 	function image() {

		// 		$("button").click(function(){

		// 			var movie = $(this).attr("data-name");

		// 	  		console.log(movie);
		// 			// var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=264a4525";

		// 			// $.ajax({
		// 			//  url: queryURL,
		// 			//  method: 'GET'
		// 			// }).then(function(response) {
		// 			//  console.log(response);
		// 			// });
		// 		});

		// 	};

		// console.log(image());

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

	function hangman() {

		var hangmanGame = {
		 wordsToPick: {

		 snoopdogg: {
		  picture: "snoopdogg.jpg"
		 }, 
		 sethrogen:{
		  picture: "sethrogen.jpg"
		 }, 
		 bobmarley: {
		  picture: "bobmarley.jpg"
		 }, 
		 cheech: {
		  picture: "cheech.jpg"
		 }, 
		 chong:{
		  picture: "chong.gif"
		 }, 
		 wizkhalifa:{
		  picture: "wizkhalifa.png"
		 },
		 willienelson:{
		  picture: "willienelson.jpg"
		 },
		 harold:{
		  picture: "harold.jpg"
		 },
		 kumar:{
		  picture: "kumar.jpg"
		 },
		 shaggy:{
		  picture: "shaggy.png"
		 }


		 },
		  // Variables that set the initial state of our hangman game.
		  wordInPlay: null,
		  lettersOfTheWord: [],
		  matchedLetters: [],
		  guessedLetters: [],
		  guessesLeft: 0,
		  totalGuesses: 0,
		  letterGuessed: null,
		  wins: 0,
		  // The setupGame method is called when the page first loads.
		  setupGame: function() {
		    // Here we pick a random word.
		    var objKeys = Object.keys(this.wordsToPick);
		    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
		    // Split the chosen word up into its individual letters.
		    this.lettersOfTheWord = this.wordInPlay.split("");
		    // Builds the representation of the word we are trying to guess and displays it on the page.
		    // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
		    this.rebuildWordView();
		    // This function sets the number of guesses the user gets, and renders it to the HTML.
		    this.processUpdateTotalGuesses();
		  },
		  // This function is run whenever the user guesses a letter..
		  updatePage: function(letter) {
		    // If the user has no guesses left, restart the game.
		    if (this.guessesLeft === 0) {
		      this.restartGame();
		    }
		    // Otherwise...
		    else {
		      // Check for and handle incorrect guesses.
		      this.updateGuesses(letter);
		      // Check for and handle correct guesses.
		      this.updateMatchedLetters(letter);
		      // Rebuild the view of the word. Guessed letters are revealed, unguessed letters have a "_".
		      this.rebuildWordView();
		      // If the user wins, restart the game.
		      if (this.updateWins() === true) {
		        this.restartGame();
		      }
		    }
		  },
		  // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
		  updateGuesses: function(letter) {
		    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
		    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
		      // Add the letter to the guessedLetters array.
		      this.guessedLetters.push(letter);
		      // Decrease guesses by one.
		      this.guessesLeft--;
		      // Update guesses remaining and guesses letters on the page.
		      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
		      document.querySelector("#guessed-letters").innerHTML =
		      this.guessedLetters.join(", ");
		    }
		  },
		  // This function sets the initial guesses the user gets.
		  processUpdateTotalGuesses: function() {
		    // The user will get more guesses the longer the word is.
		    this.totalGuesses = this.lettersOfTheWord.length + 5;
		    this.guessesLeft = this.totalGuesses;
		    // Render the guesses left to the page.
		    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
		  },
		  // This function governs what happens if the user makes a successful guess.
		  updateMatchedLetters: function(letter) {
		    // Loop through the letters of the "solution".
		    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
		      // If the guessed letter is in the solution, and we haven't guessed it already..
		      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
		        // Push the newly guessed letter into the matchedLetters array.
		        this.matchedLetters.push(letter);
		      }
		    }
		  },
		  // This function builds the display of the word that is currently being guessed.
		  // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
		  rebuildWordView: function() {
		    // We start with an empty string.
		    var wordView = "";
		    // Loop through the letters of the word we are trying to guess..
		    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
		      // If the current letter has been guessed, display that letter.
		      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
		        wordView += this.lettersOfTheWord[i];
		      }
		      // If it hasn't been guessed, display a "_" instead.
		      else {
		        wordView += "&nbsp;_&nbsp;";
		      }
		    }
		    // Update the page with the new string we built.
		    document.querySelector("#current-word").innerHTML = wordView;
		  },
		  // Function that "restarts" the game by resetting all of the variables.
		  restartGame: function() {
		    document.querySelector("#guessed-letters").innerHTML = "";
		    this.wordInPlay = null;
		    this.lettersOfTheWord = [];
		    this.matchedLetters = [];
		    this.guessedLetters = [];
		    this.guessesLeft = 0;
		    this.totalGuesses = 0;
		    this.letterGuessed = null;
		    this.setupGame();
		    this.rebuildWordView();
		  },
		  // Function that checks to see if the user has won.
		  updateWins: function() {
		    var win;
		    // this won't work for words with double or triple letters
		    // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
		    // this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')
		    // If you haven't correctly guessed a letter in the word yet, we set win to false.
		    if (this.matchedLetters.length === 0) {
		      win = false;
		    }
		    // Otherwise, we set win to true.
		    else {
		      win = true;
		    }
		    // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
		    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
		    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
		      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
		        win = false;
		      }
		    }
		    // If win is true...
		    if (win) {
		      // Increment wins.
		      this.wins = this.wins + 1;
		      // Update wins on the page.
		      document.querySelector("#wins").innerHTML = this.wins;
		      // Update the song title and band on the page.
		      //document.querySelector("#stonerImage").innerHTML = this.wordsToPick[this.wordInPlay] +
		      //" By " + this.wordInPlay;
		      // Update the image of the band on the page.
		      document.querySelector("#stonerDiv").innerHTML =
		        "<img class='stonerImage' src='images/" +
		        this.wordsToPick[this.wordInPlay].picture + "' alt='" +
		        this.wordsToPick[this.wordInPlay].song + "'>";
		      // Play an audio track of the band.
		      var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
		      audio.play();
		      // return true, which will trigger the restart of our game in the updatePage function.
		      return true;
		    }
		    // If win is false, return false to the updatePage function. The game goes on!
		    return false;
		  
		  }
		  };
		  // Initialize the game when the page loads.
		  hangmanGame.setupGame();

		  // When a key is pressed.. 
		  document.onkeyup = function(event) {
		  // Capture pressed key and make it lowercase.
		  hangmanGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
		  // Pass the guessed letter into our updatePage function to run the game logic.
		  hangmanGame.updatePage(hangmanGame.letterGuessed);
		};

	};

	// gif game function


	// On-click functionality for all three games

	$("#trivia-game").click(function(error) {

		error.preventDefault();

		$("#trivia-display").show();
		$("#hangman-display").hide();

		$("#game").html(trivia());

		gameToken += 25;

		console.log(gameToken);

	});


	$("#hangman-game").click(function(error) {

		error.preventDefault();

		gameToken += 25;

		$("#game").html(hangman());

		$("#hangman-display").show();

		$("#trivia-display").hide();

	});


	$("#gif-game").click(function(error) {

		error.preventDefault();

		// $("#hangman-display").hide();
		// $("#gif-display").show();

		gameToken += 25;

		$("#game").append();

	});

	function token() {

		name = 
		database.ref().push({

		});
	};

	// token();
	console.log(gameToken);

	// function writeNewPost(uid, username) {
	//   username = gameToken;
	//   var postData = {
	//     author: username,
	//     uid: uid
	//   };

	//   // Get a key for a new Post.
	//   var newPostKey = firebase.database().ref().child('posts').push().key;

	//   // Write the new post's data simultaneously in the posts list and the user's post list.
	//   var updates = {};
	//   updates['/posts/' + newPostKey] = postData;
	//   updates['/user-posts/' + uid + '/' + newPostKey] = postData;

	//   return firebase.database().ref().update(updates);
	// }

	// var ref = database.ref("scores/" + uid);

	// var userId = firebase.auth().currentUser.uid;
	// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
	// var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
	// // ...
	// });

	// console.log(userId);

	// function userUid() {
	// 	firebase.auth().onAuthStateChanged(user => {
	// 		if (user) { this.userId = user.uid}
	// 	});
	// }

	// console.log(userUid());

	// var currentUser = 

});