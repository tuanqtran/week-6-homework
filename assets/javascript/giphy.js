var i = 3;
$("#addButton").on("click", function(){
	i++;
	var newGifButton = $("<option>")
		.attr("value", "gifOptionsToPickFrom option-" + i)
		.html($("#buttonContent").val().trim());

	$("#gifOptions").append(newGifButton);
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
				.attr("src", results[j].images.fixed_height.url)
				.attr("data-animate", results[j].images.fixed_height.url)
				.attr("data-still", results[j].images.fixed_height_still.url)
				.attr("data-state", "animate");

			gifDiv.append(gifCoverBox);
			gifDiv.append(gifImage);

			$("#placeForClickedGifs").prepend(gifDiv);


			// $("#placeForClickedGifs").html(results.data.url);

			// console.log(queryURL);
			// console.log(response);
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

	var resetButton = $("#resetButton");

	});

});

