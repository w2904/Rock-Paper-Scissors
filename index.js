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
                resolve();
            }
        },  {
                once: true
            });
    });
}

    const humanRock = document.querySelector("#pc-rock");
    const humanPaper = document.querySelector("#pc-paper");
    const humanScissors = document.querySelector("#pc-scissors");
    const computerRock = document.querySelector("#npc-rock");
    const computerPaper = document.querySelector("#npc-paper");
    const computerScissors = document.querySelector("#npc-scissors");
    displayHumanChoice();

function displayHumanChoice() {
    const choiceID = localStorage.getItem("human");
    switch (choiceID) {
        case "pc-rock":
            humanRock.classList.toggle("glowing-border");
            getComputerChoice();
            return;
        case "pc-paper":
            humanPaper.classList.toggle("glowing-border");
            getComputerChoice();
            return;
        case "pc-scissors":
            humanScissors.classList.toggle("glowing-border");
            getComputerChoice();
            return;
    }
}

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
        computerChoice = "npc-scissors";
    }
    localStorage.setItem("computer", computerChoice);
    displayComputerChoice();
}

function displayComputerChoice() {
    const choiceID = localStorage.getItem("computer");
    switch (choiceID) {
        case "npc-rock":
            computerRock.classList.toggle("glowing-border");
            return;
        case "npc-paper":
            computerPaper.classList.toggle("glowing-border");
            return;
        case "npc-scissors":
            computerScissors.classList.toggle("glowing-border");
            return;
    }
}
if (localStorage.getItem("humanPoints") === null) {
    localStorage.setItem("humanPoints", "0");
}
else if (localStorage.getItem("computerPoints") === null) {
    localStorage.setIteim("computerPoints", "0");
}
const humanPoints = Number(localStorage.getItem("humanPoints")) || 0;
const computerPoints = Number(localStorage.getItem("computerPoints")) || 0;

function playRound() {
    const humanChoice = localStorage.getItem("human");
    const computerChoice = localStorage.getItem("computer");

    if ((humanChoice === "pc-rock" && computerChoice === "npc-scissors") ||
        (humanChoice === "pc-paper" && computerChoice === "npc-rock") || 
        (humanChoice === "pc-scissors" && computerChoice === "npc-paper")) {
            localStorage.setItem("humanPoints", String(humanPoints + 1));
            return "humanWon";
        }
    else if ((computerChoice === "npc-rock" && humanChoice === "pc-scissors") ||
            (computerChoice === "npc-paper" && humanChoice === "pc-rock") || 
            (computerChoice === "npc-scissors" && humanChoice === "pc-paper")) {
                localStorage.setItem("computerPoints", String(computerPoints + 1));
                return "computerWon";
            }
    else {
        return "tie";
    }
}

const humanScore = document.querySelector("#pc-score");
humanScore.textContent = localStorage.getItem("humanPoints") + " ← " + username + " SCORE";

const computerScore = document.querySelector("#npc-score");
computerScore.textContent = "COMPUTER SCORE → " + localStorage.getItem("computerPoints");

const result = document.querySelector("#result");
result.textContent = localStorage.getItem("result");

function displayRoundResult(resultOfRound, roundNumber) {
    if (resultOfRound === "humanWon") {
        localStorage.setItem("result", "Humanity wins Round " + roundNumber + ", but will this continue forever?");
        result.textContent = localStorage.getItem("result");
        return;
    }
    else if (resultOfRound === "computerWon") {
        localStorage.setItem("result", "AI wins Round " + roundNumber + " and this is a start of the end");
        result.textContent = localStorage.getItem("result");
        return;
    }
    else {
        localStorage.setItem("result", "I hope friendship wins");
        result.textContent = localStorage.getItem("result");
        return;
    }
}

async function playGame() {
    const countRound = Number(localStorage.getItem("roundNumber")) || 1;
    if (countRound > 1) {
        const resultOfRound = playRound();
        localStorage.setItem("roundNumber", String(countRound + 1));
        displayRoundResult(resultOfRound, countRound);
        await waitForHuman();
    }
    else {
        await waitForHuman();
        const resultOfRound = playRound();
        localStorage.setItem("roundNumber", String(countRound + 1));
        displayRoundResult(resultOfRound, countRound);
    }
}

if (humanPoints >= 5 || computerPoints >= 5) {
    if (humanPoints > computerPoints) {
        localStorage.setItem("result", "I hope friendship wins");
        result.textContent = localStorage.getItem("result");
    }
    else if (computerPoints > humanPoints) {
        localStorage.setItem("result", "I hope friendship wins");
        result.textContent = localStorage.getItem("result");
    }
    else {
        localStorage.setItem("result", "And lived people and robots soul to soul, didn't reap any griefs, and shared joy together forever and always... Right?");
        result.textContent = localStorage.getItem("result");
    }
    localStorage.setItem("humanPoints", "0");
    localStorage.setItem("computerPoints", "0");
    localStorage.setItem("roundNumber", "0");
    result.textContent = "I'm afraid of what's going to happen soon";
}
else {
    playGame();
}