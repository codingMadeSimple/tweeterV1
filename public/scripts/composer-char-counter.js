//Keeps track of remaining character count
console.log("antibug");

$(document).ready(function() {
  // --- our code goes here ---
  // console.log('#tweet-text')

  $('#tweet-text').keypress(function() {

    const input = $(this);
    const length = input.val().length;
    const form = input.closest("form");
    const counter = form.find(".counter");
    const outputObj = form.find("output")
    const numberCount = 140-length

    counter.text(140 - length);

    if(numberCount < 0){
      $(outputObj[0]).addClass("redFont")
    }

  });

});

