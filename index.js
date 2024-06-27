const computerScore = document.querySelector("#npc-score");
const result = document.querySelector("#result");

const username = localStorage.getItem("username") || "Human";

const humanScore = document.querySelector("#pc-score");
humanScore.textContent = "← " + username + " SCORE";

const usernameForm = document.querySelector("#username-form");

usernameForm.addEventListener("submit", (event) => {
    const input = document.querySelector("#username");
    if (input.value !== "") {
        localStorage.setItem("username", input.value);
    }
    return false;
});

const getHumanChoice = document.querySelector(".rps-choices.human");

getHumanChoice.addEventListener("click", (event) => {
    const choice = event.target;
    localStorage.setItem("human", choice.id);
});

    const humanRock = document.querySelector("#pc-rock");
    const humanPaper = document.querySelector("#pc-paper");
    const humanScissors = document.querySelector("#pc-scissors");
    displayHumanChoice(localStorage.getItem("human"));

function displayHumanChoice(choiceID) {
    switch (choiceID) {
        case "pc-rock":
            humanRock.classList.toggle("glowing-border");
            return true;
        case "pc-paper":
            humanPaper.classList.toggle("glowing-border");
            return true;
        case "pc-scissors":
            humanScissors.classList.toggle("glowing-border");
            return true;
        default:
            return false;
    }
}

const computerRock = document.querySelector("#npc-rock");
const computerPaper = document.querySelector("#npc-paper");
const computerScissors = document.querySelector("#npc-scissors");

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber >= 0 && randomNumber <= 32) {
        localStorage.setItem("computer", "rock");
        return true;
    }
    else if (randomNumber >= 33 && randomNumber <= 66) {
        localStorage.setItem("computer", "paper");
        return true;
    }
    else if (randomNumber >= 67 && randomNumber <= 100) {
        localStorage.setItem("computer", "scissors");
        return true;
    }
    else {
        return false;
    }
}

displayComputerChoice(localStorage.getItem("computer"))

function displayComputerChoice(choiceID) {
    switch (choiceID) {
        case "npc-rock":
            computerRock.classList.toggle("glowing-border");
            return true;
        case "npc-paper":
            computerPaper.classList.toggle("glowing-border");
            return true;
        case "npc-scissors":
            computerScissors.classList.toggle("glowing-border");
            return true;
        default:
            return false;
    }
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
        resultOfRound = playRound(localStorage.getItem("human"), localStorage.getItem("computer"));
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