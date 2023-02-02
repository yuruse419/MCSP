// document.querySelector('html').style.height = '100%'; //set html element height to 100% of document's height
// document.body.style.height = '100%'; //set body's height to 100% of parent's (html's) height 

// const $body = $("body"); //targets document.body
// $body.css('background-color', 'black');

// const $container = $("<div></div>"); //container to store tweets and username buttons
// $container.css('width', '70%');
// $container.css('height', '50%');
// $container.css('margin', 'auto');
// $container.css('overflow', 'scroll');
// //$container.css('display', 'flex');
// //$container.css('flex-wrap', 'wrap');
// $container.css('background-color', 'gray');

// const $header = $("<div></div>")
// $header.css("display", "flex")
// $header.css("opacity", ".7")
// $header.css('width', '70%')
// $header.css('height', '10%')
// $header.css('margin', 'auto')
// $header.css({background:'linear-gradient(lightcyan,skyblue)'})
// $header.text('Twiddler')
// $header.css('justify-content', 'center') //only works for flex or grid items
// $header.css("font-family", "arial")
// $header.css("font-size", "xxx-large")
// $header.css("border", "medium solid white")
// $header.css("padding", "20px")

// const $tweetsCont = $("<div></div>")
// $tweetsCont.css('display', 'flex')
// $tweetsCont.css('flex-wrap', 'wrap')
// $tweetsCont.css('flex', '50%')

// const $btnCont = $("<div></div>")
// $btnCont.css('display', 'flex')
// $btnCont.css('flex-wrap', 'wrap')
// $btnCont.css('flex', '50%')

// $container.append($tweetsCont)
// $container.append($btnCont)
// $body.append($header)
// $body.append($container)


// setInterval(() => {
//   getTweets();
//   console.log('updating...');
// }, 10000);

// getTweets();

// /*
// container:
//   tweets container:
//     tweets
//   button container:
//     buttons

//     |tweet||btn|
//     |fsda||btn|
//     |fsda||btn|
// */

// /*
// container:
//   tweets:
//     buttons
// */

// function getTweets() {
//   for (let i = 0; i < streams.home.length; i++) {
//     const tweet = streams.home[i];
//     var currentId = '#' + i;

//     if($(currentId).length === 0) {
//       const $tweet = $("<div></div>");

//       $tweet.attr('id', i);
//       $tweet.css("font-family", "arial")
//       $tweet.css("font-size", "large")
//       $tweet.css("border-size", "border-box")
//       $tweet.css("border", "thin solid white")
//       $tweet.css("padding", "1%")
//       $tweet.css({ 'color': 'lightblue', 'font-size': '120%' });
//       $tweet.text(tweet.message + " " + tweet.createdAt);
//       $tweetsCont.prepend($tweet);

//       $btnCont.append(userButton(tweet.user, $tweet));
//     }
  
//   }
  
// }

// function userButton(username, owningTweet) {
//   const $button = $("<button></button>")
//   $button.text('@' + username)
//   $button.attr("class", "userBtn")
//   $button.css("background-color", "lightCyan")
//   $button.css("font-family", "arial")
//   $button.css("font-size", "large")
//   $button.css("float", "right")
//   $button.css("border-size", "border-box")
//   $button.css("width", owningTweet.css('width'))

//   // owningTweet.css('width', $button.css('width'))

//   $button.click(function(e){
//     //alert(e.target.textContent)
//     $('.anything').remove();

//     const $currentUserTweets = $("<div></div>")
//     $currentUserTweets.attr('class', 'anything');
//     $currentUserTweets.css('width', '50%');
//     $currentUserTweets.css('height', '20%');
//     $currentUserTweets.css('margin', 'auto');
//     $currentUserTweets.css('overflow', 'scroll');
//     $currentUserTweets.css('background-color', 'lightblue');

//     const clickedUser = e.target.textContent.slice(1) //username as string
//     var $messages;

//     //streams.users[username]
//     for(var i = 0; i < streams.users[clickedUser].length; i++) {
//       $messages = $('<div></div>')

//       $messages.text(streams.users[clickedUser][i].message)

//       $currentUserTweets.append($messages)
//       //console.log(streams.users[clickedUser][i].message)
//     }
      
//     $body.append($currentUserTweets)
//     console.log($body.children())
//   })

//   return $button
// }

const $html = $('html');
$html.css('height', '100%');

const $body = $('body');
$body.css('display', 'flex');
$body.css('flex-direction', 'column');
$body.css('height', '100%');
$body.css('align-items', 'center');

const $header = $('<div></div>');
$header.text('Twidder');

$header.css('display', 'flex');
$header.css('height', '20%');
$header.css('width', '70%');
//$header.css('margin', 'auto');
$header.css('font-size', 'xxx-large');

//container to store tweets and tweeters
const $tweetsFeed = $('<div></div>');
$tweetsFeed.css('height', '50%');
$tweetsFeed.css('width', '70%');
$tweetsFeed.css('display', 'flex');
$tweetsFeed.css('flex-wrap', 'wrap');
$tweetsFeed.css('overflow', 'scroll');
$tweetsFeed.css('flex-direction', 'column');

//container to store individual tweets
const $tweets = $('<div></div>');
$tweets.css('display', 'flex');
$tweets.css('flex-direction', 'column');
$tweets.css('width', '50%');

//container to store individual tweeters
const $tweeters = $('<div></div>');
$tweeters.css('display', 'flex');
$tweeters.css('flex-direction', 'column');
$tweeters.css('width', '50%');

$tweetsFeed.append($tweets);
$tweetsFeed.append($tweeters);

$body.append($header);
$body.append($tweetsFeed);

refreshTweets();

function refreshTweets() {
  for (let i = 0; i < streams.home.length; i++) {
    const tweet = streams.home[i];
    var currentId = '#' + i;
    
    if($(currentId).length === 0) {
      const $tweet = $("<div></div>");
    
      $tweet.attr('id', i);
      $tweet.css("font-family", "arial");
      $tweet.css("font-size", "large");
      $tweet.css("border-size", "border-box");
      $tweet.css("border", "thin solid black");
      $tweet.css('width', '100%')
      $tweet.css({'color': 'lightblue', 'font-size': '120%' });
      $tweet.text(tweet.message + " " + tweet.createdAt);

      $tweets.prepend($tweet);
      $tweeters.prepend(refreshTweeters(tweet.user, $tweet));
    }
  }
}

function refreshTweeters(username, owningTweet) {
  const $tweeter = $("<button></button>");
  $tweeter.text('@' + username);
  $tweeter.attr("class", "tweeterBtn");
  $tweeter.css("background-color", "lightCyan");
  $tweeter.css("font-family", "arial");
  $tweeter.css("font-size", "large");
  $tweeter.css("border-size", "border-box");
  $tweeter.css("width", '100%');
  $tweeter.css("height", '100%');

  return $tweeter;
}