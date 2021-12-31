var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);    //. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");    //. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1); //. Call checkAnswer() after a user has clicked and chosen their answer,
                                            // passing in the index of the last answer in the user's sequence.
});

function checkAnswer(currentLevel) {
  // check if the most recent user answer is the same as the game pattern.
  // If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      //then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);    //. Inside nextSequence(), update the h1 with this change in the value of level.
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];   //. Inside the new function generate a new random number between 0 and 3,
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); //. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");   // remove the pressed class after a 100 milliseconds.
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
