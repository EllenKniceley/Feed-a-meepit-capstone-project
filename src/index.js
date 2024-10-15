const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

let myAudio = document.querySelector('#audio');


 // Generates a random integer within a range.
function randomInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

 // Sets the time delay given a difficulty parameter.
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

 // Chooses a random hole from a list of holes.
function chooseHole(holes) {
  const index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  } else {
    lastHole = hole;
  }
  return hole;
}


// Calls the showUp function if time > 0 and stops the game if time = 0.
function gameOver() {
  if (time > 0) {
    timeoutID = showUp();
    return timeoutID;
  } else {
    gameStopped = stopGame();
    return gameStopped;
  }

}


// Calls the showAndHide() function with a specific delay and a hole.
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function showAndHide(hole, delay){
  toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay); 
  return timeoutID;
}

/**
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*/
function toggleVisibility(hole){
  hole.classList.toggle("show")
  return hole;
}

// Increments the score and updates the scoreboard.
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

// Sets score to zero.
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

// Reduces the timer on screen by 1 each second and updates the display.
function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

// Starts the timer using setInterval. 
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  updateScore();
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  moles.forEach(
    mole => mole.addEventListener("click", whack)
  );
  return moles;
}


/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  clearInterval(timer);
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame(){
  if (time > 0) {
    console.log("game already in play")
  } else {
    myAudio.play();
    setDuration(10);
    timerDisplay.textContent = 10;
    clearScore();
    startTimer();
    setEventListeners();
    showUp();
    return "game started";
  }
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
