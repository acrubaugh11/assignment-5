'use strict';

// Images for computer choices
const computerImages = [
  "images/rock.PNG",
  "images/paper.PNG",
  "images/scissors.PNG",
];

// Possible game outcomes
const scenarios = ["You Win!", "Computer Wins!", "It's a Tie!"];

// Function to determine who wins
function handleResults(playerHand, computerHand) {
  // Check for a tie
  if (playerHand == computerHand) {
    return scenarios[2];

  }
  // Check if player won
  if (
    (playerHand == "rock" && computerHand == "scissors") ||
    (playerHand == "paper" && computerHand == "rock") ||
    (playerHand == "scissors" && computerHand == "paper")
  ) {
    return scenarios[0];
    // All other scenarios mean computer wins
  } else {
    return scenarios[1];
  }
}

// Main game loop
function gameLoop() {
  // DOM elements; player images, computer image, result display, reset button
  let playerImg = document.querySelectorAll(".player-img");
  let computerImg = document.getElementById("computer-img");
  let result = document.getElementById("result");
  let playAgainButton = document.getElementById("play-again");
  let playerScore = document.getElementById("player-score");
  let computerScore = document.getElementById("computer-score");
  let tieScore = document.getElementById("ties");
  let resetScore = document.getElementById("reset-score");

  // Game state variables
  let clicked = 0;
  let playerChoice;
  let computerChoice;
  let winner;
  let playerWins = 0;
  let computerWins = 0;
  let ties = 0;

  // Add click event listeners to all player images
  for (let i = 0; i < playerImg.length; i++) {
    playerImg[i].addEventListener("click", handleclick);
  }

  // Add click event listener to reset score button
  resetScore.addEventListener("click", () => {
    playerWins = 0;
    computerWins = 0;
    ties = 0;
    playerScore.textContent = playerWins;
    computerScore.textContent = computerWins;
    tieScore.textContent = ties;
  }
  );

  // Handle player image click
  function handleclick() {
    if (clicked > 0) {
      return;
    }
    this.classList.toggle("hand-chosen");
    clicked++;
    playerChoice = this.dataset.name;
    console.log("Player chose: " + playerChoice);
    // Start computer's turn after player has chosen and their choice is handled
    computerTurn();
  }

  // Function for computers turn
  function computerTurn() {
    let i = 0;
    // Shuffle through computer images to simulate thinking. Change image every 200 ms
    let shuffle = setInterval(() => {
      computerImg.src = computerImages[i];
      i++;
      if (i === computerImages.length) {
        i = 0;
      }
    }, 200);
    // After 3 seconds, stop shuffling and make the computer's choice
    setTimeout(() => {
      computerChoice = computerImages[Math.floor(Math.random() * computerImages.length)];
      computerImg.src = computerChoice;
      computerImg.classList.toggle("computer-chosen");
      computerChoice = computerChoice.split("/")[1].split(".")[0];
      console.log("Computer chose: " + computerChoice);

      // Determine and display the winner after computer has chosen and handle reset button
      clearInterval(shuffle);
      winner = handleResults(playerChoice, computerChoice);

      // Update scores based on the winner
      if (winner === scenarios[0]) {
        playerWins++;
      }
      else if (winner === scenarios[1]) {
        computerWins++;
      }
      else {
        ties++;
      }

      console.log(winner);
      console.log(playerWins + " - " + computerWins + " - " + ties);
      let resultText = document.createTextNode(" " + winner);

      // Update score display using textContent
      playerScore.textContent = playerWins;
      computerScore.textContent = computerWins;
      tieScore.textContent = ties;

      result.appendChild(resultText);
      playAgainButton.addEventListener("click", playAgain);
    }, 3000);
  }

  // Reset the game state for a new round, re-initialize variables and UI elements
  function playAgain() {
    // Setting clicked to 0 allows gameLoop to run again
    clicked = 0;
    playerChoice = "";
    computerChoice = "";
    winner = "";
    for (let i = 0; i < playerImg.length; i++) {
      playerImg[i].classList.remove("hand-chosen");
    }
    computerImg.src = "images/question-mark.PNG";
    computerImg.classList.toggle("computer-chosen");
    result.removeChild(result.lastChild);
  }
}

gameLoop();
