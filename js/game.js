// Constructor function for a Game

function Game(difficulty) {
  this.lives = 10;
  this.score = 0;
  this.bullet_count = 3;
  $("#white_flash").hide();
  $("#click").hide();

  // Set the difficulty- easy by default
  if(typeof(difficulty) === "undefined") {
    this.speed = this.difficulty.easy;
  }
  else {
    this.speed = this.difficulty[difficulty];
  }

  // Kick-off the first wave of Ducks
  this.nextRound();
}

// Maps difficulty to speed at which a Duck traverses the screen in milliseconds.
Game.prototype.difficulty = {
  easy: 8000,
  medium: 4000,
  hard: 2500
}

// Fire off two new Ducks. After waiting a little while, continue to the next
// round if we've got more lives, or show the Game Over screen.
Game.prototype.nextRound = function() {

  var duck = new Duck(this);
  var duck = new Duck(this);
  var _this = this;
  _this.bullet_count = 0;
  _this.bullet_count = 3;
  

  $('.shell').show();
  $('#game').unbind("click");
  $('#game').click(function () {
    if (_this.bullet_count > 0) {
      $('#white_flash').show(0).delay(10).hide(2);
    } else { 
      $('#click').show(0).delay(30).hide(5);
    }
    _this.bullet_count -= 1;
    console.log(_this.bullet_count);
    if (_this.bullet_count < 1 ) {
      $('.shell_3').hide()
    } else if (_this.bullet_count < 2) {
      $('.shell_2').hide() 
    } else if (_this.bullet_count < 3) {
      $('.shell_1').hide()
    }
  });

  // Do this again in a little while...
  var roundTimer = setTimeout(function() {
    // End the game if we've run out of lives
    if(_this.lives <= 0) {
      // Game over man
      _this.gameOver();
    }
    else {
      // Keep going!
      _this.nextRound();
    }
  }, this.speed + 2000);

}

// Show the Game Over modal and insert the player's score.
Game.prototype.gameOver = function() {
  $("#points").html(this.score);
  $("#game-over").toggle();
}

// Add the given number of points to the score, and print the total to the log.
Game.prototype.addScore = function(points) {
  this.score += points;
  console.log("Score: " + this.score);
  $('#score').text(this.score);
}