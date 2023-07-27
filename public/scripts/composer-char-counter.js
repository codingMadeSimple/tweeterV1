//Keeps track of remaining character count


const hideErrors = function() {
  $("#emptyError").hide();
  $("#toLongError").hide();
};

//Needs either change or 
$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    const input = $(this);
    const length = input.val().length;
    const form = input.closest("form");
    const counter = form.find(".counter");
    const outputObj = form.find("output")
    const numberCount = 140-length

    counter.text(numberCount);

    if(numberCount < 0){
      $(outputObj).addClass("red-font")
    } else {
      $(outputObj).removeClass("red-font")
    }

    if(length > 0 && length <= 140){
      hideErrors();
    }
  });

});

