$("#addButton").on("click", function(){
	var newGifButton = $("<button>")
		.attr("data-random", $("#buttonContent").val().trim())
		.html($("#buttonContent").val().trim());

	$("#gifButtonContainer").append(newGifButton);

});

var i = 0;
$("#gifButtonContainer button").on("click", function(){
	i++;
	console.log(this);
	var searchTermInfo = $(this).data('random');
	var searchTerm = $("<option>");
	searchTerm.append(searchTermInfo)
		.attr("value", "gifOptionsToPickFrom option-" + i)
	$("#gifOptions").append(searchTerm);

});


var searchButton = $("#searchButton");

searchButton.on("click", function(){
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $("#gifOptions option:selected").text() + "&limit=" + $("#limit option:selected").val() + "&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(results) {
		console.log(queryURL);
		console.log(results);

	});
});

