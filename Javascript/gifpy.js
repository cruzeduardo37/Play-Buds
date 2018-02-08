
//create an opening page setting the rules, etc.
//create an array of cards to arrange on the page
var cards = [
	{
		name: "flat-triangle",
		image: "images/if_playstation-flat-icon-triangle-dark_341043.png",
		id: 1

	},
	{
		name: "flat-triangle",
		image: "/images/if_playstation-flat-icon-triangle-dark_341043.png",
		id: 1

	},
	{
		name: "checked-circle",
		image: "/images/if_circle-check_430087.png",
		id: 2

	},
	{
		name: "checked-circle",
		image: "/images/if_circle-check_430087.png",
		id: 2

	},
	{
		name: "triangle-plain",
		image: "/images/if_button_shape_triangle_352894.png",
		id: 3

	},
	{
		name: "triangle-plain",
		image: "/images/if_button_shape_triangle_352894.png",
		id: 3

	},
	{
		name: "pause-circle",
		image: "/images/if_pause-circle-outline_326570.png",
		id: 4

	},
	{
		name: "pause-circle",
		image: "/images/if_pause-circle-outline_326570.png",
		id: 4

	}

];


//create an initialize function to run at the start of the page, will include reset, shuffle, reset modals,
// function(initialize){




// }

//functio to put the cards onto the page
// function(buildHTML){
	//main card div
$("document").ready(function buildHTML(){

	for (var i = 0; i < cards.length; i++) {
	
	
		var divContain = $("<div>");
		divContain.addClass("card flip-container");
		divContain.attr("data-id", cards[i].id);
		$(".game").append(divContain);


		var insideCard = $("<div>");i
		insideCard.addClass("inside flipper");
		$(".card").append(insideCard);

		var front = $("<div>");
		front.addClass("front");
		$(".inside").append(front);
		
		var imageFront = $("<img>");
		imageFront.attr("src", cards[i].image);
		imageFront.attr("width", "200px");
		imageFront.attr("height", "200px");
		$(".front").append(imageFront);

		var back = $("<div>");
		back.addClass("back");
		back.attr("src", "../images/marijuana.png")
		$(".inside").append(back);

		var imageBack = $("<img>");
		imageBack.attr("src", "images/marijuana.png");
		imageBack.attr("width", "200px");
		imageBack.attr("height", "200px");
		$(".back").append(imageBack);

	}

});


// };
//function to show and hide the cards
//if the cards match pause or freeze them
//once all the cards are matched run winner modal
//set link to replay or back to game page







