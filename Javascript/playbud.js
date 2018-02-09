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

		firebase.auth().signOut().then(function() {
	  		swal("You logged out");
	  		window.location = "index.html";
		}).catch(function(error) {
		  console.log(error);
		});

	});

//hide function to hide games until user clicks on them

	$("#trivia-display").hide();
	$("#hangman-display").hide();
	$("#memory-display").hide();

//******************************************************
	// trivia game function
//******************************************************	

	function trivia() {

		var panel = $("#quiz-area");
		var countStartNumber = 60;

		// Question set
		var questions = [{
		  question: "What propoganda film stoked fears of cannabis use causing moral and societal decay?",
		  answers: ["This is The End", "Soylent Green", "Up in Smoke", "Reefer Madness"],
		  correctAnswer: "Reefer Madness",
		}, {
		  question: "The Dude abides in which movie?",
		  answers: ["Supertroopers", "The Big Lebowski", "Dazed and Confused", "Pineapple Express"],
		  correctAnswer: "The Big Lebowski",
		}, {
		  question: "'Bye, Felicia' comes from which 1990's stoner film?",
		  answers: ["How High", "Dude, Where's My Car?", "Friday", "Next Friday"],
		  correctAnswer: "Friday",
		}, {
		  question: "In what movie did Dolly Parton, Lily Tomlin, and Jane Fonda share a joint?",
		  answers: ["Saving Grace", "Harold and Kumar go to White Castle", "9 to 5", "Steele Magnolias"],
		  correctAnswer: "9 to 5",
		}, {
		  question: "Sean Penn ordered a pizza to class in which 1980's film?",
		  answers: ["Billy Madison", "Bill and Ted's Excellent Adventure", "Half-Baked", "Fast Times at Ridgemont High"],
		  correctAnswer: "Fast Times at Ridgemont High",
		}, {
		}];

		var newGif = []

		for (var i = 0; i < questions.length; i ++){
		  var movie = questions[i].correctAnswer
		  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4rflNs59030SuauN0DtLlygAYaj36Q6J&q=" + movie + "&limit=1&offset=0&rating=PG&lang=en";

		  $.ajax({
		    async: false,
		    url: queryURL,
		    method: "GET"
		  }).then(function(response) {
		   	newGif.push(response.data[0].images.fixed_height_small.url)
		  	console.log(response.data[0].images.fixed_height_small.url);
		  });
		};

		setTimeout(function(){
		  for (var i = 0; i < questions.length; i ++){
		    questions[i].image = newGif[i]
		  }
		  console.log(questions)
		}, 500)

		// console.log(gif);

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
		    $("#counter-number").html(parseInt(this.counter));
		    this.currentQuestion++;
		    this.loadQuestion.bind(this)();
		  },

		  timeUp: function() {

		    clearInterval(window.timer);

		    $("#counter-number").text(this.counter);

		    panel.html("<h2>Out of Time!</h2>");
		    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
		    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

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
		    panel.append("<img src='" + questions[this.currentQuestion].image + "'>");
		   

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
		    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
		  

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


//******************************************************
	// hangman game function
//******************************************************


	function hangman() {

		var hangmanGame = {
		 wordsToPick: {

		 snoopdogg: {
		  picture: "../images/hangman/snoopdogg.jpg"
		 }, 
		 sethrogen:{
		  picture: "../images/hangman/sethrogen.jpg"
		 }, 
		 bobmarley: {
		  picture: "../images/hangman/bobmarley.jpg"
		 }, 
		 cheech: {
		  picture: "../images/hangman/cheech.jpg"
		 }, 
		 chong:{
		  picture: "../images/hangman/chong.gif"
		 }, 
		 wizkhalifa:{
		  picture: "../images/hangman/wizkhalifa.png"
		 },
		 willienelson:{
		  picture: "../images/hangman/willienelson.jpg"
		 },
		 harold:{
		  picture: "../images/hangman/harold.jpg"
		 },
		 kumar:{
		  picture: "../images/hangman/kumar.jpg"
		 },
		 shaggy:{
		  picture: "../images/hangman/shaggy.png"
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
				database.ref('users/' + uid[0]).push({
					hangman: this.wins
				});
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

//******************************************************
// memory game function
//******************************************************

	function memory() {

//create an opening page setting the rules, etc.
	//create an array of cards to arrange on the page
	
	var newMovie = ["Pineapple Express", "Clerks", "reefer", "marley"];

	for (var i = 0; i < newMovie.length; i ++){
  	var movie = newMovie[i];
  	var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=264a4525";

	  $.ajax({
	    async: false,
	    url: queryURL,
	    method: "GET"
	  }).then(function(response) {
	   	//newMovie.push(response.Poster)
	  	console.log(response.Poster);
	   	helpMe.push(response.Poster)

	  });
	};
	var helpMe = [];
	console.log(helpMe);


	//create an initialize function to run at the start of the page, will include reset, shuffle, reset modals,
	// function(initialize){


	//function to put the cards onto the page
	// function(buildHTML){
		//main card div
	document.body.onkeyup = function (e) {

	if (e.keyCode == 32) {

		$("#space-bar").hide();

		var cards = [
		{
			name: "flat-triangle",
			image: String(helpMe[0]),
			id: 1,
			tag: "A",
			item: "one"
		},
		
		{
			name: "checked-circle",
			image: String(helpMe[1]),
			id: 2,
			tag: "C",
			item: "two"

		},
		
		{
			name: "triangle-plain",
			image: String(helpMe[3]),
			id: 3,
			tag: "E",
			item: "three"

		},
		
		{
			name: "pause-circle",
			image: String(helpMe[2]),
			id: 4,
			tag: "G",
			item: "four"

		},
		{
			name: "triangle-plain",
			image: String(helpMe[3]),
			id: 3,
			tag: "F",
			item: "five"

		},
		{
			name: "checked-circle",
			image: String(helpMe[1]),
			id: 2,
			tag: "D",
			item: "six"

		},
		{
			name: "pause-circle",
			image: String(helpMe[2]),
			id: 4,
			tag: "H",
			item: "seven"

		},
		{
			name: "flat-triangle",
			image: String(helpMe[0]),
			id: 1,
			tag: "B",
			item: "eight"

		}

	];

		
		$("document").ready(buildHTML);

		function buildHTML(){

			$(".game").empty();
			$(".game2").empty();

			console.log("buildHTML");

			cards = shuffle(cards);


			for (var i = 0; i < 4; i++) {
			
				var divContain = $("<div>");
				divContain.addClass("card flip-container col-md-3");
				$(".game").append(divContain);

				var insideCard = $("<div>");
				insideCard.addClass("flipper");
				insideCard.addClass(cards[i].item);
				insideCard.attr("id", cards[i].tag);
				insideCard.attr("data-id", cards[i].id);
				divContain.append(insideCard);

				var front = $("<div>");
				front.addClass("front");
				insideCard.append(front);

				var imageFront = $("<img>");
				imageFront.attr("src", cards[i].image);
				imageFront.attr("width", "150px");
				imageFront.attr("height", "200px");
				front.append(imageFront);

				var back = $("<div>");
				back.addClass("back");
				back.attr("src", "../images/marijuana.png")
				insideCard.append(back);
			
				var imageBack = $("<img>");
				imageBack.attr("src", "images/marijuana.png");
				imageBack.attr("width", "200px");
				imageBack.attr("height", "200px");
				back.append(imageBack);
			};

			for (var i = 4; i < cards.length; i++) {
			
				var divContain = $("<div>");
				divContain.addClass("card flip-container col-md-3");
				$(".game2").append(divContain);

				var insideCard = $("<div>");
				insideCard.addClass("flipper");
				insideCard.addClass(cards[i].item);
				insideCard.attr("id", cards[i].tag);
				insideCard.attr("data-id", cards[i].id);
				divContain.append(insideCard);

				var front = $("<div>");
				front.addClass("front");
				insideCard.append(front);

				var imageFront = $("<img>");
				imageFront.attr("src", cards[i].image);
				imageFront.attr("width", "150px");
				imageFront.attr("height", "200px");
				front.append(imageFront);

				var back = $("<div>");
				back.addClass("back");
				back.attr("src", "../images/marijuana.png")
				insideCard.append(back);
			
				var imageBack = $("<img>");
				imageBack.attr("src", "images/marijuana.png");
				imageBack.attr("width", "200px");
				imageBack.attr("height", "200px");
				back.append(imageBack);
			};
		};

		};
	};	

	// var itemNumber = [".one", ".two", ".three", ".four", ".five", ".six", ".seven", ".eight"]

	var choice1 = "";
	var choice2 = "";
	var chosen = [];

		$(".gameWrap").on("click", ".flipper", function(){
			console.log(this);
			
			var choiceId = $(this).attr("data-id");

			if(chosen.includes(choiceId)){
				return;
			}
			
			$(this).toggleClass("A");
			console.log(chosen.length);


			if (choice1 == ""){
				choice1 = choiceId;
				
			}else if(choice2 == ""){
				choice2 = choiceId;

			}

			setTimeout(function(){
			if (choice1 != "" && choice2 != "") {

				if(choice1 === choice2){
					console.log("choice1: " + choice1 + "choice2: " + choice2 + "... win")
					chosen.push(choiceId);
					
				}else{
					console.log("choice1: " + choice1 + "choice2: " + choice2 + "... lose")
					
					
					$("div.flipper[data-id='" + choice1 + "']").removeClass("A");
					$("div.flipper[data-id='" + choice2 + "']").removeClass("A");
					
				}

			if(chosen.length === 4){
				
				reset();
			}

				choice1 = "";
				choice2 = "";
			}
		}, 1000);

		});
		


	function shuffle(cards) {
		for (var i = cards.length; i; i--){
			randIndex = Math.floor(Math.random() * i)
			tempCard = cards[i-1]
			cards[i-1] = cards[randIndex]
			cards[randIndex] = tempCard
		};
		return cards
	};


	function reset (){
		console.log("reset");

		$(".game").empty();		
		$(".game2").empty();

		chosen = [];
		
		buildHTML();
	}

	//function to show and hide the cards
	//if the cards match pause or freeze them
	//once all the cards are matched run winner modal
	//set link to replay or back to game page

	};
//end of memory game

	// On-click functionality for all three games

	$("#trivia-game").click(function(error) {

		error.preventDefault();

		gameToken += 25;

		$("#trivia-display").show();
		$("#hangman-display").hide();
		$("#memory-display").hide();

		$("#game").html(trivia());

		// console.log(gameToken);

	});


	$("#hangman-game").click(function(error) {

		error.preventDefault();

		gameToken += 25;

		$("#game").html(hangman());

		$("#hangman-display").show();

		$("#trivia-display").hide();
		$("#memory-display").hide();

	});


	$("#memory-game").click(function(error) {

		error.preventDefault();

		gameToken += 25;

		$("#game").html(memory());

		$("#memory-display").show();

		$("#hangman-display").hide();
		$("#trivia-display").hide();

		// database.ref('users/' + uid[0]).push({
		// 	gameToken: gameToken
		// });
	});


	var uid = [];

	firebase.auth().onAuthStateChanged(function(user) {
	 window.user = user; // user is undefined if no user signed in
	 uid.push(user.uid);

		database.ref('users/' + uid[0]).on("child_added", function(snapshot) {
			var game = snapshot.val().gameToken;
		});

		database.ref('users/' + uid[0]).push({
			// hangman: this.wins,
			gameToken: gameToken
		});

	});

	console.log(uid);

});