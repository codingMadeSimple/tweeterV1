const createTweetElement = function(tweetObject) {
  const $tweet = $(
    `<article class="tweetBorder">
    <header class="sideBySide center containerMargin">
      <div class="sideBySide">
        <div>${tweetObject.user.avatars}</div>
        <div>${tweetObject.user.names}</div>
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