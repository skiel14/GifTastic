var btns = ["black widow", "captain marvel", "thor", "captain america", "iron man", "star lord", "spiderman", "groot", "drax", "gamora", "tigger", "elsa"];

for(var i=0; i<btns.length; i++) {
  var btn = $("<button>");
  btn.addClass("btn btn-primary buttons");
  btn.attr("type", "button");
  btn.attr("data-topic", btns[i]);
  btn.text(btns[i]);
  $("#buttons").append(btn);
}


$(document).on("click", ".buttons", function() {
  var topic = $(this).attr("data-topic");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=NHJuYNsORjQKuIUeIQc8DpFw8lJHLRzg&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    var results = response.data;

    for (var i=0; i<results.length; i++) {
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var image = $("<img>");
      image.attr("data-state", "still");
      image.attr("data-still", results[i].images.fixed_height_still.url);
      image.attr("data-animate", results[i].images.fixed_height.url)
      image.attr("src", image.attr("data-still"));
      image.addClass("gifs");
      gifDiv.prepend(p);
      gifDiv.prepend(image);
      $("#gifs").prepend(gifDiv);
    }
  });
});

$(document).on("click", ".gifs", function() {
  var state = $(this).attr("data-state");

  if(state == "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else if(state == "animate"){
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})

$("#clear").on("click", function() {
  $("#gifs").empty();
});

$("#reset").on("click", function() {
  $("#buttons").empty();
  for(var i=0; i<btns.length; i++) {
    var btn = $("<button>");
    btn.addClass("btn btn-primary buttons");
    btn.attr("type", "button");
    btn.attr("data-topic", btns[i]);
    btn.text(btns[i]);
    $("#buttons").append(btn);
  }
});

$("#submit").on("click", function() {
  var btn = $("<button>");
  btn.addClass("btn btn-primary buttons");
  btn.attr("type", "button");
  btn.attr("data-topic", $("#addButton").val());
  btn.text($("#addButton").val());
  $("#buttons").append(btn);
  $("#addButton").val("");
});
