const computerImages = [
  "images/rock.png",
  "images/paper.png",
  "images/scissors.png",
];

const scenarios = ["You Win!", "Computer Wins!", "It's a Tie!"];

function handleResults(playerHand, computerHand) {
  if (playerHand == computerHand) {
    return scenarios[2];
  }
  if (
    (playerHand == "rock" && computerHand == "scissors") ||
    (playerHand == "paper" && computerHand == "rock") ||
    (playerHand == "scissors" && computerHand == "paper")
  ) {
    return scenarios[0];
  } else {
    return scenarios[1];
  }
}

function gameLoop() {
  let playerImg = document.querySelectorAll(".player-img");
  let computerImg = document.getElementById("computer-img");
  let result = document.getElementById("result");
  let resetBtn = document.querySelector("button");

  let clicked = 0;
  let playerChoice;
  let computerChoice;
  let winner;

  for (let i = 0; i < playerImg.length; i++) {
    playerImg[i].addEventListener("click", handleclick);
  }

  function handleclick() {
    if (clicked > 0) {
      return;
    }
    this.classList.toggle("hand-chosen");
    clicked++;
    playerChoice = this.dataset.name;
    console.log("Player chose: " + playerChoice);
    computerTurn();
  }

  function computerTurn() {
    let i = 0;
    let shuffle = setInterval(() => {
      computerImg.src = computerImages[i];
      i++;
      if (i === computerImages.length) {
        i = 0;
      }
    }, 200);
    setTimeout(() => {
      computerChoice = computerImages[Math.floor(Math.random() * computerImages.length)];
      computerImg.src = computerChoice;
      computerImg.classList.toggle("computer-chosen");
      computerChoice = computerChoice.split("/")[1].split(".")[0];
      console.log("Computer chose: " + computerChoice);

      clearInterval(shuffle);
      winner = handleResults(playerChoice, computerChoice);
      console.log(winner);
      let resultText = document.createTextNode(" " + winner);
      result.appendChild(resultText);
      resetBtn.addEventListener("click", resetGame);
    }, 3000);
  }

  function resetGame() {
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
