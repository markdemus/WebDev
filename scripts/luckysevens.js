var bet = document.getElementById("bet"),
    playBtn = document.getElementById("play"),
    output = document.getElementById("output"),
    results = document.getElementById("results"),
    outputTemplate = document.getElementById("output").innerHTML,
    resultsTemplate = document.getElementById("results").innerHTML,
    rules = document.getElementById("rules"),
    rulesBtn = document.getElementById("rulesBtn"),
    resultsBtn = document.getElementById("resultsBtn"),
    hint = document.getElementById("hint"),
    tds = document.getElementsByTagName("td"),
    count = 0, maxCount = 0, luckyCount = 0, currentMoney, maxMoney, betTest;

// Event binding
bet.onfocus = showHint;
bet.onblur = hideHint;
playBtn.onclick = playGame;
rulesBtn.onclick = showRules;
resultsBtn.onclick = showResults;
// Allows user to press enter from the input field to start the game
bet.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        playBtn.click();
    }
});

////////////////////////////// Main function ///////////////////////////////////
function playGame() {
  resetContent();
  validateInput();
// Set initial maxMoney in the case of never making more than the initial bet
  currentMoney = betTest;
  maxMoney =  currentMoney;

// Setting up non-blocking recursive loop to run the game's main function
  var gameLoop = window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           window.oRequestAnimationFrame      ||
           window.msRequestAnimationFrame     ||
           null ;

  var recursiveLoop = function() {
    if (currentMoney < 1) {
      populateResults();
      resetGame();
      showHint();
      return false;
    }
    playing();
    gameLoop(recursiveLoop);
  };

  // Start playing and logging the game with non-blocking recursive loop
  gameLoop(recursiveLoop);
}

///////////////////////////////// Game helpers //////////////////////////////////
function resetContent () {
  output.innerHTML = outputTemplate;
  results.innerHTML = resultsTemplate;
  hint.style.visibility = "hidden";
  rules.style.display = "none";
  output.style.display = "block";
  results.style.display = "none";
  rulesBtn.style.display = "none";
  resultsBtn.style.display = "none";
  playBtn.disabled = true;
}

function validateInput () {
  betTest = parseInt(bet.value);
  while (isNaN(betTest) || betTest < 10 || betTest > 100) {
    betTest = parseInt(prompt("Place bet by entering a number from 10 to 100"));
    }

  }


function playing () {
  var die1 = 1 + Math.floor(Math.random() * 6),
      die2 = 1 + Math.floor(Math.random() * 6),
      win = false;
  if (die1+die2==7) {
    currentMoney+=4;
    luckyCount++;
    win = true;
  } else currentMoney--;
  count++;
  if (currentMoney > maxMoney) {
    maxMoney = currentMoney;
    maxCount = count;
  }
// Game Log output
// This is slow for larger numbers, so I set a <=50 upper limit on the initial bet
if (win) {
    var prependWin = "<span class='second win'>Roll #" + count +
      " and your cash total is <ins>$" + currentMoney +
      "</ins></span><br><span class='first'>You rolled " + die1 +
      " and " + die2 + " and <mark>won $4!</mark></span><br>";
    output.insertAdjacentHTML("afterbegin", prependWin);
  } else {
    var prependLoss = "<span class='second lose'>Roll #" + count +
      " and your earnings total is <ins>$" + currentMoney +
      "</ins></span><br><span class='first'>You rolled " + die1 +
      " and " + die2 + " and lost $1</span><br>";
    output.insertAdjacentHTML("afterbegin", prependLoss);
  }
}

function populateResults () {
// Grammar
  var roll1 = (maxCount==1) ? " roll" : " rolls",
      roll2 = (count==1) ? " roll" : " rolls",
      times = (luckyCount==1) ? " time" : " times";
// Results table
  tds[0].innerHTML = "$" + betTest;
  tds[1].innerHTML = "$" + maxMoney;
  tds[2].innerHTML = maxCount + roll1;
  tds[3].innerHTML = count + roll2;
  if (luckyCount) results.innerHTML += "<p><mark><b>You rolled a <i>Lucky Seven</i> "+luckyCount+times+".</b></mark></p>";
  if (betTest == maxMoney) results.innerHTML += "<p><mark>Oh no... you never made more than your starting bet.</mark></p>";
  if (count == betTest) results.innerHTML += "<p><mark><b>And not even one <i>Lucky Seven</i>... it is not your day!</b></mark></p>";
  showResults();
}

function resetGame () {
  count = 0;
  maxCount = 0;
  luckyCount = 0;
  playBtn.innerHTML = "Play Again?";
  bet.value = "";
  bet.focus();
  playBtn.disabled = false;
}

// Buttons at the bottom of the page
function showRules () {
  rules.style.display = "block";
  results.style.display = "none";
  rulesBtn.style.display = "none";
  resultsBtn.style.display = "block";
}

function showResults () {
  rules.style.display = "none";
  output.style.display = "block";
  results.style.display = "block";
  rulesBtn.style.display = "block";
  resultsBtn.style.display = "none";
}

// Hint on input focus
function showHint () {
    hint.style.visibility = "visible";
}

function hideHint () {
  hint.style.visibility = "hidden";
}
