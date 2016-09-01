var gifChoices = ["dog", "bird", "fish"];

// console.log(gifChoices[0]);

function addGifButton(){
	i++;
	$("#gifOptions option").attr("selected", false);
	var gifOption = $("<option>")
		.attr("value", "gifOptionsToPickFrom")
		.attr("id", "option-" + i)
		.html($("#buttonContent").val().trim())
		.attr("selected", "selected");
	gifChoices.push(gifOption.text());
	$("#gifOptions").append(gifOption);

	console.log($("#buttonContent").val() + " was added to the list.");

}


var i = 3;
$("#addButton").on("click", function(){
	if ($("#buttonContent").val().trim() == ""){
		console.log("Not a valid text option.");
    }else{
    	if (gifChoices.indexOf($("#buttonContent").val().trim()) != -1){
    		console.log($("#buttonContent").val() + " was used already added.");
    	}else{
			addGifButton();
    	}
    }
});

$("#buttonContent").keypress(function(event) {
    if ($("#buttonContent").val().trim() == ""){
 		console.log("Not a valid text option.");  

    }else if (event.which == 13) {
    	if (gifChoices.indexOf($("#buttonContent").val().trim()) != -1){
	        event.preventDefault();
    	}else{
	        event.preventDefault();
	        addGifButton();
	    }
    }
});

var searchButton = $("#searchButton");

searchButton.on("click", function(){
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $("#gifOptions option:selected").text() + "&limit=" + $("#limit option:selected").val() + "&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(response) {
		var results = response.data;

		for (var j=0; j < results.length; j++){
			var gifDiv = $("<div>")
				.addClass("gifContentBox");
			var gifCoverBox = $("<div>")
				.addClass("coverBox");
			var gifImage = $("<img>")
				.attr("src", results[j].images.fixed_height_still.url)
				.attr("data-animate", results[j].images.fixed_height.url)
				.attr("data-still", results[j].images.fixed_height_still.url)
				.attr("data-state", "still");

			gifDiv.append(gifCoverBox);
			gifDiv.append(gifImage);

			$("#placeForClickedGifs").prepend(gifDiv);
		}


		$("#placeForClickedGifs img").on("click", function(){
			var state = $(this).attr("data-state");

			if(state == "still"){
				$(this).attr("src", $(this).data("animate"));
				$(this).attr("data-state", "animate");
			}else{
				$(this).attr("src", $(this).data("still"));
				$(this).attr("data-state", "still");
			}
		});
	});
});

var resetButton = $("#resetButton");

resetButton.on("click", function(){
	i = 0;
	$("#gifOptions").empty();
	$("#placeForClickedGifs").empty();
	gifChoices = [];
});

