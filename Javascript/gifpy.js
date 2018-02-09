
//create an opening page setting the rules, etc.
//create an array of cards to arrange on the page
var cards = [
	{
		name: "flat-triangle",
		image: "images/if_playstation-flat-icon-triangle-dark_341043.png",
		id: 1,
		tag: "A",
		item: "one"


	},
	
	{
		name: "checked-circle",
		image: "images/if_circle-check_430087.png",
		id: 2,
		tag: "C",
		item: "two"

	},
	
	{
		name: "triangle-plain",
		image: "images/if_button_shape_triangle_352894.png",
		id: 3,
		tag: "E",
		item: "three"

	},
	
	{
		name: "pause-circle",
		image: "images/if_pause-circle-outline_326570.png",
		id: 4,
		tag: "G",
		item: "four"

	},
	{
		name: "triangle-plain",
		image: "images/if_button_shape_triangle_352894.png",
		id: 3,
		tag: "F",
		item: "five"

	},
	{
		name: "checked-circle",
		image: "images/if_circle-check_430087.png",
		id: 2,
		tag: "D",
		item: "six"

	},
	{
		name: "pause-circle",
		image: "images/if_pause-circle-outline_326570.png",
		id: 4,
		tag: "H",
		item: "seven"

	},
	{
		name: "flat-triangle",
		image: "images/if_playstation-flat-icon-triangle-dark_341043.png",
		id: 1,
		tag: "B",
		item: "eight"

	}

];

	var gifName = [];
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4rflNs59030SuauN0DtLlygAYaj36Q6J&q=" + gifName + "&limit=15&offset=0&rating=PG&lang=en";


	$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function(response){

		};


//create an initialize function to run at the start of the page, will include reset, shuffle, reset modals,
// function(initialize){


//functio to put the cards onto the page
// function(buildHTML){
	//main card div
$("document").ready(buildHTML);

function buildHTML(){

	console.log("buildHTML")

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
		imageFront.attr("width", "200px");
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
		imageFront.attr("width", "200px");
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
}

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







