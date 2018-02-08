
var panel = $("#quiz-area");
var countStartNumber = 60;

var movie = "reefer madness";

var gif = [];

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

var newImages = []

for (var i = 0; i < questions.length; i ++){
  var movie = questions[i].correctAnswer
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=264a4525";

  $.ajax({
    async: false,
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
   newImages.push(response.Poster)

  })
}

setTimeout(function(){
  for (var i = 0; i < questions.length; i ++){
    questions[i].image = newImages[i]
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
    $("#counter-number").text(this.counter);
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