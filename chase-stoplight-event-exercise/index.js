(function() {
  'use strict';

  // YOUR CODE HERE
  var stBtn = document.getElementById('stopButton');
  var slBtn = document.getElementById('slowButton');
  var goBtn = document.getElementById('goButton');

  var stLight = document.getElementById('stopLight');
  var slLight = document.getElementById('slowLight');
  var goLight = document.getElementById('goLight');

  //toggle bulb colors
  stBtn.addEventListener('click', function(e) {
    stLight.classList.toggle('stop');
  });

  slBtn.addEventListener('click', function(e) {
    slLight.classList.toggle('slow');
  });

  goBtn.addEventListener('click', function(e) {
    goLight.classList.toggle('go');
  });

  //log mouse entry to buttons
  stBtn.addEventListener('mouseenter', function(e) {
    console.log(`Entered ${e.target.textContent} button`);
  });

  slBtn.addEventListener('mouseenter', function(e) {
    console.log(`Entered ${e.target.textContent} button`);
  });

  goBtn.addEventListener('mouseenter', function(e) {
    console.log(`Entered ${e.target.textContent} button`);
  })

  //log mouse exit of buttons
  stBtn.addEventListener('mouseleave', function(e) {
    console.log(`Left ${e.target.textContent} button`);
  });
  
  slBtn.addEventListener('mouseleave', function(e) {
    console.log(`Left ${e.target.textContent} button`);
  });
  
  goBtn.addEventListener('mouseleave', function(e) {
    console.log(`Left ${e.target.textContent} button`);
  });

  //one event listener to log all bulb toggles
  document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
    if(e.target.matches('#stopButton')) {
      console.log(stLight.classList.contains('stop') ? `${e.target.textContent} bulb on` : `${e.target.textContent} bulb off`);
    }
    else if(e.target.matches('#slowButton')) {
      console.log(slLight.classList.contains('slow') ? `${e.target.textContent} bulb on` : `${e.target.textContent} bulb off`);
    }
    else if(e.target.matches('#goButton')) {
      console.log(goLight.classList.contains('go') ? `${e.target.textContent} bulb on` : `${e.target.textContent} bulb off`);
    }
  });
})();