document.addEventListener("")

const username = localStorage.getItem("username") || "Human";

const usernameForm = document.querySelector("#username-form");

usernameForm.addEventListener("submit", (event) => {
    const input = document.querySelector("#username");
    if (input.value !== "") {
        localStorage.setItem("username", input.value);
    }
    return false;
});

const getHumanChoice = document.querySelector(".rps-choices.human");


function waitForHuman() {
    return new Promise((resolve) => {
        getHumanChoice.addEventListener("click", (event) => {
            const choice = event.target;
            if (choice.id) {
                localStorage.setItem("human", choice.id);
                resolve(choice.id)
            }
        }, {
            once: true
        });
    });
}

    const humanRock = document.querySelector("#pc-rock");
    const humanPaper = document.querySelector("#pc-paper");
    const humanScissors = document.querySelector("#pc-scissors");
    displayHumanChoice(localStorage.getItem("human"));

function displayHumanChoice(choiceID) {
    switch (choiceID) {
        case "pc-rock":
            humanRock.classList.toggle("glowing-border");
            getComputerChoice();
           break;
        case "pc-paper":
            humanPaper.classList.toggle("glowing-border");
            getComputerChoice();
            break;
        case "pc-scissors":
            humanScissors.classList.toggle("glowing-border");
            getComputerChoice();
            break;
    }
}

const computerRock = document.querySelector("#npc-rock");
const computerPaper = document.querySelector("#npc-paper");
const computerScissors = document.querySelector("#npc-scissors");

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let computerChoice = "";
    if (randomNumber <= 32) {
        computerChoice = "npc-rock";
    }
    else if (randomNumber <= 66) {
        computerChoice = "npc-paper";
    }
    else {
        computerChoice = "npc-paper";
    }
    localStorage.setItem("computer", computerChoice);
    displayComputerChoice(computerChoice);
    return true;
}

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

let humanPoints = 0;
let computerPoints = 0;
const humanScore = document.querySelector("#pc-score");
humanScore.textContent = humanPoints + " ← " + username + " SCORE";
const result = document.querySelector("#result");

function playRound (humanChoice, computerChoice) {
    if ((humanChoice === "pc-rock" && computerChoice === "npc-scissors") ||
        (humanChoice === "pc-paper" && computerChoice === "npc-rock") || 
        (humanChoice === "pc-scissors" && computerChoice === "npc-paper")) {
            return "humanWon";
        }
    else if ((computerChoice === "npc-rock" && humanChoice === "pc-scissors") ||
            (computerChoice === "npc-paper" && humanChoice === "pc-rock") || 
            (computerChoice === "npc-scissors" && humanChoice === "pc-paper")) {
                return "computerWon";
            }
    else {
        return "tie";
    }
}

function displayRoundResult(resultOfRound, roundNumber) {
    const computerScore = document.querySelector("#npc-score");
    if (resultOfRound === "humanWon") {
        ++humanPoints;
        result.textContent = "Humanity wins Round " + roundNumber + ", but will this continue forever?";
        humanScore.textContent = humanPoints + " ← " + username + " SCORE";
        return true;
    }
    else if (resultOfRound === "computerWon") {
        ++computerPoints;
        result.textContent = "AI wins Round " + roundNumber + " and this is a start of the end";
        computerScore.textContent = "COMPUTER SCORE → " + computerPoints;
        return true;
    }
    else {
        result.textContent = "I hope friendship wins";
        return true;
    }
}

async function playGame() {
    let resultOfRound = "";
    let countRound = 1;
    while (computerPoints < 5 || humanPoints < 5) {
        await waitForHuman();
        resultOfRound = playRound(localStorage.getItem("human"), localStorage.getItem("computer"));
        displayRoundResult(resultOfRound, countRound);
        ++countRound;
    }
    
    if (humanPoints > computerPoints) {
        result.textContent = "Humanity wins against rebellious AI, but at what cost?"
        countRound = 1;
        return "endTheGame";
    }
    else if (computerPoints > humanPoints) {
        result.textContent = "Praise be to our AI overlords!";
        countRound = 1;
        return "endTheGame";
    }
    else {
        result.textContent = "And lived people and robots soul to soul, didn't reap any griefs, and shared joy together forever and always... Right?";
        countRound = 1;
        return "endTheGame";
    }
}

if (playGame() === "EndTheGame") {
    humanPoints = 0;
    computerPoints = 0;
}