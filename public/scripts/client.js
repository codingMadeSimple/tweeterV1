/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetObject = require('../../server/data-files/initial-tweets.json');

const tweetArray = [];

const createTweetElement = function(tweetObject) {
  const $tweet = $(
    `<article>
    <header class="sideBySide center containerMargin">
      <div class="sideBySide center">
        <div><img src="${tweetObject.user.avatars}"></div>
        <div>${tweetObject.user.name}</div>
      </div>
      <div>${tweetObject.user.handle}</div>
    </header>
    <div class="tweetPadding bold bottomBorder">
    ${tweetObject.content.text}
    </div>
    <footer class="sideBySide makeSmaller containerMargin">
      <div class="bold">${timeago.format(tweetObject.created_at)}</div>
      <div class="sideBySide splitUp ">
        <div><i class="fa-solid fa-flag icon"></i></div>
        <div><i class="fa-solid fa-retweet icon"></i></div>
        <div><i class="fa-solid fa-heart icon"></i></div>
      </div>
    </footer>
  </article>`
  );
  return $tweet;
};

$(document).ready(function() {
  //Creates the tweets in the tweet array and then renders the tweets in the tweet container
  const renderTweets = function(tweetArray) {
    for (const tweets of tweetArray) {
      const $tweet = createTweetElement(tweets);
      $('#tweets-container').append($tweet);
    }
  };


  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(data, status) {
        // console.log(tweetsObject[data])
        for (const info of data) {
          tweetArray.push(info);
        }
        renderTweets(tweetArray);
      }
      );
  };

  // Event handler on the submit button

  $("form").submit(function(event) {
    // const text = $("#tweet-text").serialize();
    const text = document.getElementById("tweet-text").value;
    event.preventDefault();
    if (text.length === 0) {
      alert("Please input something into the tweet box before hitting the button.");
      event.preventDefault();
    } else if (text.length > 140) {
      alert("Please be under the 140 character limit.");
      event.preventDefault();
    } else if (text === null) {
      alert("Please input something in the tweet box");
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
    });

  });
});

