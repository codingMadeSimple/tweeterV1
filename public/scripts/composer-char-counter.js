//Keeps track of remaining character count

$(document).ready(function() {
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

