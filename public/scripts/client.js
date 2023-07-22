/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetObject = require('../../server/data-files/initial-tweets.json');

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
  return $tweet;
};

const renderTweets = function(tweetsArray){
  for(const tweets of tweetsArray){
    const $tweet = createTweetElement(tweets)
    $('#tweets-container').append($tweet);
  }
}

$(document).ready(function() {
  renderTweets(data)
});


$(document).ready(function() {
  $("form").submit(function(event) {
    const text = $("#tweet-text").serialize()
    console.log(text)
event.preventDefault();



$.ajax({
  method: 'POST',
  url: '/tweets',
  data: $(this).serialize()
}).then((response) => {
  console.log('inside the .then', response);
});

});
});

