/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('#document').ready(function(e){
  const tweetArray = [];

  const createTweetElement = function(tweetObject) {
    let $tweet = $(
      `<article class="tweetBorder element">
      <header class="sideBySide center">
        <div class="sideBySide center splitUp">
          <div><img src="${tweetObject.user.avatars}"></div>
          <div>${tweetObject.user.name}</div>
        </div>
        <div>${tweetObject.user.handle}</div>
      </header>
      <div class="tweetPadding bold bottomBorder">
      <p>${escape(tweetObject.content.text)}</p>
      </div>
      <footer class="sideBySide makeSmaller">
        <div class="bold">${timeago.format(tweetObject.created_at)}</div>
        <div class="sideBySide splitUp">
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
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const hideFunc =function(){
    $("#emptyError").hide();
    $("#toLongError").hide();
  }

    //Creates the tweets in the tweet array and then renders the tweets in the tweet container
    const renderTweets = function(tweets) {
      
      for (const data of tweets) {
        const $tweet = createTweetElement(data);
        $('#tweets-container').prepend($tweet);
      }
    };

    const loadTweets = function() {
      $.ajax("/tweets", { method: "GET" })
        .then(function(data, status) {
          // $('#tweets-container').prepend($tweet);
          for (const info of data) {
            tweetArray.push(info);
          }
          renderTweets(tweetArray);
        }
        );
    };
    loadTweets();
    // Event handler on the submit button

  $("form").submit(function(event) {
    const text = document.getElementById("tweet-text").value;
    
    event.preventDefault();
    if (text.length === 0) {
      event.preventDefault();
      return $("#emptyError").slideDown()
    } else if (text.length > 140) {
      event.preventDefault();
      return $("#toLongError").slideDown()
    } else if (text === null) {
      alert("Please input something")
      event.preventDefault();
    }
    //Ajax post request to post data from the textbox and the submit button
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    }).then((response) => {
      console.log('inside the .then', response);
      loadTweets();
      hideFunc();
    });
  });
}); //Document ready finishes here.
