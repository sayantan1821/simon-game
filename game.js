var gamePattern = [];
var  userClickedPattern = [];
var buttonColour = [ "red", "blue", "green", "yellow"];
var level = 0;
var start = false;

$(document).keypress(function () {

  if(!start) {
    $("#level-title").text("level " + level);
    nextsequence();
    start = true;
  }

});
$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);

  });

function  checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("success");
      if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
          nextsequence();
        },1000);
      }
    }
    else{
      console.log("failed");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("game over. press any ket");
      startOver();
    }
}

function nextsequence() {
  userClickedPattern = [];
  level++;
    $("#level-title").text("level " + level);

  var randomNumber = Math.floor( Math.random() * 3 ) + 1;

  var randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}
function startOver() {
  gamePattern = [];
  level = 0;
  start = false;
}
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}
function  animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  },100);
}
