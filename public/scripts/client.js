/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetObject = require('../../server/data-files/initial-tweets.json');

const tweetData =
{
  "user": {
    "name": "Descartes",
    "avatars": "https://i.imgur.com/nlhLi3I.png",
    "handle": "@rd"
  },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1689900663803
};

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
      <div class="bold">${tweetObject.created_at}</div>
      <div class="sideBySide splitUp ">
        <div><i class="fa-solid fa-flag icon"></i></div>
        <div><i class="fa-solid fa-retweet icon"></i></div>
        <div><i class="fa-solid fa-heart icon"></i></div>
      </div>
    </footer>
  </article>`
  );
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet);
  return $tweet;
};




$(document).ready(function() {
  createTweetElement(tweetData);
});

 