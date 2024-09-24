let username = "Bipedal humanoid";

const usernameForm = document.querySelector("#username-form");

usernameForm.addEventListener("submit", (event) => {
    const input = document.querySelector("#username");
    if (input.value !== "") {
        username = input.value;
        changeInputToPara(input, username);
        event.preventDefault();
    }
});

function changeInputToPara(input, username) {
    const inputLabel = document.querySelector("label[for='username']");
    input.style.display = "none";
    inputLabel.style.display = "none";
    const para = document.createElement("p");
    para.textContent = "USERNAME: " + username;
    usernameForm.appendChild(para);
}

const getPlayerChoice = document.querySelector(".rps-choices.player");
const confirmationButton = document.querySelector("#play-button");
const displayPlayerChoice = document.querySelector(".choice-display.pc");
const displayComputerChoice = document.querySelector(".choice-display.npc");

function waitForPlayer() {
    let choice;
    getPlayerChoice.addEventListener("click", (event) => {
        choice = event.target.id.slice(3);
        if (choice) {
            displayPlayerChoice.textContent = "<" + choice.toUpperCase() + ">";
            localStorage.setItem("player", choice);
        }
    });
    return new Promise((resolve) => {
        function handleListeners() {
            if (choice === "rock" || choice === "paper" || choice === "scissors") {
                getComputerChoice();
                confirmationButton.removeEventListener("click", handleListeners);
                resolve();
            }
            else {
                alert("Please, click on rock, paper or scissors before confirming");
            }
        }
        confirmationButton.addEventListener("click", (handleListeners));
    });
}

    const computerRock = document.querySelector("#npc-rock");
    const computerPaper = document.querySelector("#npc-paper");
    const computerScissors = document.querySelector("#npc-scissors");

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 100);
    let computerChoice = "";
    if (randomNumber <= 32) {
        computerChoice = "rock";
        computerRock.classList.toggle("glowing-border");
    }
    else if (randomNumber <= 66) {
        computerChoice = "paper";
        computerPaper.classList.toggle("glowing-border");
    }
    else {
        computerChoice = "scissors";
        computerScissors.classList.toggle("glowing-border");
    }
    if (roundNumber > 1) {
        removeComputerStyle();
    }
    displayComputerChoice.textContent = "<" + computerChoice.toUpperCase() + ">";
    localStorage.setItem("computer", computerChoice);
}

function removeComputerStyle() {
    switch (localStorage.getItem("computer")) {
        case "rock":
            computerRock.classList.toggle("glowing-border");
            break;
        case "paper":
            computerPaper.classList.toggle("glowing-border");
            break;
        case "scissors":
            computerScissors.classList.toggle("glowing-border");
            break;
    }
}

if (localStorage.getItem("playerPoints") === null) {
    localStorage.setItem("playerPoints", "0");
}

else if (localStorage.getItem("computerPoints") === null) {
    localStorage.setItem("computerPoints", "0");
}

let playerPoints = 0;
let computerPoints = 0;
let roundNumber = 1;

function playRound() {
    const playerChoice = localStorage.getItem("player");
    const computerChoice = localStorage.getItem("computer");
    const strength = {
        "rock": { strongerThan: "scissors" },
        "paper": { strongerThan: "rock" },
        "scissors": { strongerThan: "paper" }
    }
    if (strength[playerChoice].strongerThan === computerChoice) {
        playerPoints += 1;
        localStorage.setItem("result", "Humanity wins Round " + roundNumber + ", but will this continue forever?");
        return "playerWon";
    }
    else if (strength[computerChoice].strongerThan === playerChoice) {
        computerPoints += 1;
        localStorage.setItem("result", "AI wins Round " + roundNumber + " and this is a start of the end");
        return "computerWon";
    }
    else if (playerChoice === computerChoice) {
        localStorage.setItem("result", "I hope friendship wins");
        return "tie";
    }
}

const playerScore = document.querySelector("#pc-score");
const computerScore = document.querySelector("#npc-score");
const result = document.querySelector("#result");
const resetButton = document.querySelector("#reset-button");

async function playGame() {
    await waitForPlayer();
    playRound();
    result.textContent = localStorage.getItem("result");
    playerScore.textContent = playerPoints + " ← " + username + " SCORE";
    computerScore.textContent = "COMPUTER SCORE → " + computerPoints;
    roundNumber++;
    return new Promise((resolve) => {
        resolve();
    });
}

async function playGameCycle() {

    while (playerPoints < 5 && computerPoints < 5) {
        await playGame();
    }

    if (playerPoints > computerPoints) {
        localStorage.setItem("result", "AI have lost... Right?");
        result.textContent = localStorage.getItem("result");
    }
    else if (computerPoints > playerPoints) {
        localStorage.setItem("result", "Praise our new overlords");
        result.textContent = localStorage.getItem("result");
    }
    else {
        localStorage.setItem("result", "And lived people and robots soul to soul, didn't reap any griefs, and shared joy together forever and always... Right?");
        result.textContent = localStorage.getItem("result");
    }

    confirmationButton.style.display = "none";
    resetButton.style.display = "inline-block";
    resetButton.addEventListener("click", async () => {
        await reset();
        playGameCycle();
    })
}

function reset() {
    return new Promise((resolve) => {
        playerPoints = 0;
        computerPoints = 0;
        roundNumber = 1;
        playerScore.textContent = playerPoints + " ← " + username + " SCORE";
        computerScore.textContent = "COMPUTER SCORE → " + computerPoints;
        localStorage.setItem("roundNumber", "0");
        result.textContent = "I'm afraid of what's going to happen soon";
        resetButton.style.display = "none";
        confirmationButton.style.display = "inline-block";
        resolve();
    });
}

playGameCycle();

window.addEventListener("beforeunload", () => {
    localStorage.clear();
})