const rock = "rock";
const paper = "paper";
const scissors = "scissors";
let humanScore = 0;
let computerScore = 0;
const computerSelection = getComputerChoice();
const humanSelection = getHumanChoice();

function getComputerChoice() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber >= 0 && randomNumber <= 32) {
        return rock;
    }
    else if (randomNumber >= 33 && randomNumber <= 66) {
        return paper;
    }
    else {
        return scissors;
    }
}

function getHumanChoice() {
    getChoice = prompt("Rock, paper or scissors: ");
    humanChoice = getChoice.toLowerCase();
    switch (humanChoice) {
        case "rock":
            return rock;
        case "paper":
            return paper;
        case "scissors":
            return scissors;
        default:
            alert("This is not a correct choice");
            return false;
    }
}

function playRound (humanChoice, computerChoice) {
    if ((humanChoice === rock && computerChoice === scissors) ||
        (humanChoice === paper && computerChoice === rock) || 
        (humanChoice === scissors && computerChoice === paper)) {
            console.log("Humanity won this round!");
            return ++humanScore;
        }
    else if ((computerChoice === rock && humanChoice === scissors) ||
            (computerChoice === paper && humanChoice === rock) || 
            (computerChoice === scissors && humanChoice === paper)) {
                console.log("Computers win this round!");
                return ++computerScore;
            }
    else {
        alert("Friendship wins!");
        return;
    }
}

function playGame() {
    for (let i = 0; i < 5; i++) {
        playRound(humanSelection, computerSelection);
    }
}