let humanScore = 0;
let computerScore = 0;
let resultOfRound;
const resultOfGame = playGame();

function getComputerChoice() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber >= 0 && randomNumber <= 32) {
        console.log("Computer chose rock");
        return "rock";
    }
    else if (randomNumber >= 33 && randomNumber <= 66) {
        console.log("Computer chose paper");
        return "paper";
    }
    else {
        console.log("Computer chose scissors");
        return "scissors";
    }
}

function getHumanChoice() {
    let getChoice = prompt("Rock, paper or scissors: ").toLowerCase();
    while (!["rock", "paper", "scissors"].includes(getChoice)) {
        alert("This is incorrect choice. Please, choose rock, paper or scissors");
        getChoice = prompt("Rock, paper or scissors: ").toLowerCase;
    }
    console.log(`Human chose ${getChoice}`);
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