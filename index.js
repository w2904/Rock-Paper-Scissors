const humanRock = document.querySelector("#pc-rock");
const humanPaper = document.querySelector("#pc-paper");
const humanScissors = document.querySelector("#pc-scissors");

const computerRock = document.querySelector("#npc-rock");
const computerPaper = document.querySelector("#npc-paper");
const computerScissors = document.querySelector("#npc-scissors");

const humanScore = document.querySelector("#pc-score");
const computerScore = document.querySelector("#npc-score");
const result = document.querySelector("#result");


function getComputerChoice() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber >= 0 && randomNumber <= 32) {
        computerRock.style.cssText = "border: 1px solid yellow";
        return "rock";
    }
    else if (randomNumber >= 33 && randomNumber <= 66) {
        computerPaper.style.cssText = "border: 1px solid yellow";
        return "paper";
    }
    else {
        computerScissors.style.cssText = "border: 1px solid yellow";
        return "scissors";
    }
}

function getHumanChoice() {
    const divRPS = document.querySelector(".rps-choices.human");
    let getChoice;
    divRPS.addEventListener("click", (event) => {
        getChoice = event.target.id;
        event.target.id.style.cssText = "border: 1px solid yellow";
    });
    return getChoice;
}

function playRound (humanChoice, computerChoice) {
    if ((humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") || 
        (humanChoice === "scissors" && computerChoice === "paper")) {
            return "humanWon";
        }
    else if ((computerChoice === "rock" && humanChoice === "scissors") ||
            (computerChoice === "paper" && humanChoice === "rock") || 
            (computerChoice === "scissors" && humanChoice === "paper")) {
                return "computerWon";
            }
    else {
        return "tie";
    }
}

function playGame() {
    for (let i = 0; i < 5; i++) {
        resultOfRound = playRound(getHumanChoice(), getComputerChoice());
        console.log(resultOfRound);
        if (resultOfRound === "humanWon") {
            alert("Humanity wins this round!");
            console.log("Humanity wins this round!");
            ++humanScore;
        }
        else if (resultOfRound === "computerWon") {
            alert("Computers win this round!");
            console.log("Computers win this round!");
            ++computerScore;
        }
        else if (resultOfRound === "tie") {
            alert("It's a tie!");
            console.log("It's a tie!");
            continue;
        }
    }
    if (humanScore > computerScore) {
        alert("Humanity wins the game!");
        console.log("Humanity wins the game!");
        return "Humanity route";
    }
    else if (computerScore > humanScore) {
        alert("Computers wins the game!");
        console.log("Computers wins the game!");
        return "Computers route";
    }
    else {
        alert("Friendship wins!");
        console.log("Friendship wins");
        return "Friendship route";
    }
}