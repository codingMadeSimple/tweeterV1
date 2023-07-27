/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('#document').ready(function(e) {

  //Adding new tweet html with interpolated variables
  const createTweetElement = function(tweetObject) {
    let $tweet = $(
      `<article class="tweet-border shadow">
      <header class="align-horizonal center-contents">
        <div class="align-horizonal center-contents splitUp">
          <div><img src="${tweetObject.user.avatars}"></div>
          <div>${tweetObject.user.name}</div>
        </div>
        <div>${tweetObject.user.handle}</div>
      </header>
      <div class="tweets-format bold ">
      <p class="tweet-content"">${escape(tweetObject.content.text)}</p>
      </div>
      <footer class="align-horizonal makeSmaller">
        <div class="bold">${timeago.format(tweetObject.created_at)}</div>
        <div class="align-horizonal splitUp">
          <div><i class="fa-solid fa-flag icon"></i></div>
          <div><i class="fa-solid fa-retweet icon"></i></div>
          <div><i class="fa-solid fa-heart icon"></i></div>
        </div>
      </footer>
    </article>`
    );
    return $tweet;
  };

  //Anti hacking feature
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //A function that will hide the errors after they pop up. This is called on keypress and on click of tweet submit button
  const hideErrors = function() {
    $("#emptyError").hide();
    $("#toLongError").hide();
  };

  //Creates the tweets in the tweet array and then renders the tweets in the tweet container
  const renderTweets = function(tweets) {
    // Clear tweat-container
    $("#tweets-container").empty();
    for (const data of tweets) {
      const $tweet = createTweetElement(data);
      $('#tweets-container').prepend($tweet);
    }
  };


  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(data, status) {
        renderTweets(data);
      }
      ).catch((error) => {
        console.log("An error has occured.")
      })
  };

  //Loads in stored tweets
  loadTweets();

  // Event handler on the tweet submit button
  $("form").submit(function(event) {
    const text = $("#tweet-text").val().trim();
    event.preventDefault();

    //Checking user input for edge cases
    if (text.length === 0) {
      return $("#emptyError").slideDown();
    } else if (text.length > 140) {
      return $("#toLongError").slideDown();
    }

    //Ajax post request to post data from the textbox and the submit button
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    }).then((response) => {

      //Call create tweet function here 
      loadTweets();
      //This will hide the errors if a user fixes the input and submits it
      hideErrors();
      //need to clear the textarea
      $("#tweet-text").val("").trigger("keyup")

      //Handles the bad post request
    }).catch((error) =>{
      console.log("An error has occured.")
    })

  });
});


