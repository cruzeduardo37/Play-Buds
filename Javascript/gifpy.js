
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


//create an initialize function to run at the start of the page, will include reset, shuffle, reset modals,
// function(initialize){




// }

//functio to put the cards onto the page
// function(buildHTML){
	//main card div
$("document").ready(function buildHTML(){

	for (var i = 0; i < 4; i++) {
	
	
		var divContain = $("<div>");
		divContain.addClass("card flip-container col-md-3");
		divContain.attr("data-id", cards[i].id);
		$(".game").append(divContain);

		var insideCard = $("<div>");
		insideCard.addClass("flipper");
		insideCard.addClass(cards[i].item);
		insideCard.attr("id", cards[i].tag);
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
		divContain.attr("data-id", cards[i].id);
		$(".game2").append(divContain);

		var insideCard = $("<div>");
		insideCard.addClass("flipper");
		insideCard.addClass(cards[i].item);
		insideCard.attr("id", cards[i].tag);
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

});

// var itemNumber = [".one", ".two", ".three", ".four", ".five", ".six", ".seven", ".eight"]







	$(".flip-container").on("click", ".one", function(){
		console.log("works");
		$(".one").toggleClass("A");
	});
	$(".flip-container").on("click", ".two", function(){
		console.log("works");
		$(".two").toggleClass("A");
		
	});
	$(".flip-container").on("click", ".three", function(){
		console.log("works");
		$(".three").toggleClass("A");
		
	});
	$(".flip-container").on("click", ".four", function(){
		console.log("works");
		$(".four").toggleClass("A");
		
	});
	$(".flip-container").on("click", ".five", function(){
		console.log("works");
		$(".five").toggleClass("A");
		
	});
	$(".flip-container").on("click", ".six", function(){
		console.log("works");
		$(".six").toggleClass("A");
		
	});
	$(".flip-container").on("click", ".seven", function(){
		console.log("works");
		$(".seven").toggleClass("A");
		
	});
	$(".flip-container").on("click", ".eight", function(){
		console.log("works");
		$(".eight").toggleClass("A");
		
	});


	


// 	var cardFront = $(this).children(".front");
// 	var cardBack = $(this).children(".back");

// console.log("works")
// 	if (cardFront.is(":visible")) {
// 		console.log("front is visible")
// 		cardFront.hide();
// 		cardBack.show();


// 	}else{
// 		console.log("bask is visible")
// 		console.log(this)
// 		cardBack.hide();
// 		cardFront.show();
// 	}

// 	// $(this).stop();

// })


//function to show and hide the cards
//if the cards match pause or freeze them
//once all the cards are matched run winner modal
//set link to replay or back to game page







