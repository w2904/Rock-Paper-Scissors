const username = localStorage.getItem("username") || "Human";

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
            getComputerChoice();
            return true;
        case "pc-paper":
            humanPaper.classList.toggle("glowing-border");
            getComputerChoice();
            return true;
        case "pc-scissors":
            humanScissors.classList.toggle("glowing-border");
            getComputerChoice();
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
        localStorage.setItem("computer", "npc-rock");
        return true;
    }
    else if (randomNumber >= 33 && randomNumber <= 66) {
        localStorage.setItem("computer", "npc-paper");
        return true;
    }
    else if (randomNumber >= 67 && randomNumber <= 100) {
        localStorage.setItem("computer", "npc-scissors");
        return true;
    }
    return false;
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

const humanScorePara = document.querySelector("#pc-score");
const computerScorePara = document.querySelector("#npc-score");
let humanPoints = 0;
let computerPoints = 0;

function playRound (humanChoice, computerChoice, roundNumber) {
    if ((humanChoice === "pc-rock" && computerChoice === "npc-scissors") ||
        (humanChoice === "pc-paper" && computerChoice === "npc-rock") || 
        (humanChoice === "pc-scissors" && computerChoice === "npc-paper")) {
            ++humanPoints;
            return "humanWon";
        }
    else if ((computerChoice === "npc-rock" && humanChoice === "pc-scissors") ||
            (computerChoice === "npc-paper" && humanChoice === "pc-rock") || 
            (computerChoice === "npc-scissors" && humanChoice === "pc-paper")) {
                ++computerPoints;
                return "computerWon";
            }
    else {
        return "tie";
    }
}

const result = document.querySelector("#result");

function displayRoundResult() {

}

function playGame() {
    for (let i = 1; i < 6; i++) {
        resultOfRound = playRound(localStorage.getItem("human"), localStorage.getItem("computer"));
        displayRoundResult(resultOfRound, i);
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