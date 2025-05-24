// Select elements
const playerCard = document.getElementById("player-card");
const resetButton = document.getElementById("reset-button");
const computerCard = document.getElementById("computer-card");
const drawButton = document.querySelector("#draw-button");
const gameMessage = document.querySelector("#game-message");
const playerContainer = document.querySelector("#player-container");
const computerContainer = document.querySelector("#computer-container");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
let playerScore = 0;
let computerScore = 0;
//BOM property/method
console.log("Window size:", window.innerWidth, "x", window.innerHeight);

// Deck of cards (Ace = 14, King = 13, Queen = 12, Jack = 11)
const deck = [];
for (let i = 2; i <= 14; i++) {
    deck.push(i);
}

// Function to shuffle the deck
const shuffleDeck = () => deck.sort(() => Math.random() - 0.5); //google suggest the - Fisher-Yates shuffle <--to complicated 


// Function to draw a card
const drawCard = () => deck[Math.floor(Math.random() * deck.length)];
//aded form function to game --player inputs their name
document.getElementById("player-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = document.getElementById("player-name").value.trim();
    if (playerName.length < 3) {
        alert("Name must be at least 3 characters long.");
        return;
    }
    alert(`Welcome to the game, ${playerName}!`);
});


//The guts of the program
const playRound = () => {
   
    let playerDraw = drawCard();
    let computerDraw = drawCard();

    // Display card values using textContent
    playerCard.textContent = playerDraw;
    computerCard.textContent = computerDraw;

    //Score bopoard
    if (playerDraw > computerDraw) {
    playerScore++;
    playerScoreElement.textContent = `Player Score: ${playerScore}`;
    } else if (playerDraw < computerDraw) {
    computerScore++;
    computerScoreElement.textContent = `Computer Score: ${computerScore}`;
    }


    // Determine the winner
    if (playerDraw > computerDraw) {
        // Using innerText for immediate content update
        gameMessage.innerHTML = "<strong style='color: blue;'> Player wins this round!</strong>";
    } else if (playerDraw < computerDraw) {
        // Using innerHTML to emphasize winner message with formatting using Style
        gameMessage.innerHTML = "<strong style='color: red;'>Computer wins this round!</strong>";
    } else {
        // Using textContent for a normal message ie regular message no style
        gameMessage.textContent = "It's a tie! Time for WAR!";

        // WAR scenario: draw 4 additional cards
        let playerWarCards = [drawCard(), drawCard(), drawCard(), drawCard()];
        let computerWarCards = [drawCard(), drawCard(), drawCard(), drawCard()];

        // create war cards for player dynamically pointing to the DOM
        playerWarCards.forEach((value) => {
            const warCard = document.createElement("div");
            warCard.classList.add("card");
            warCard.textContent = value;
            playerContainer.appendChild(warCard);
        });
        //create war cards for computer dynamnically pointing to the DOM
        computerWarCards.forEach((value) => {
            const warCard = document.createElement("div");
            warCard.classList.add("card");
            warCard.textContent = value;
            computerContainer.appendChild(warCard);
        });

        // Final WAR card decides winner 0 1 2 3 (3 being the fourth card)
        let finalPlayerCard = playerWarCards[3];
        let finalComputerCard = computerWarCards[3];

        setTimeout(() => {
            if (finalPlayerCard > finalComputerCard) {
                gameMessage.innerHTML = `<strong style='color: blue;'>Player wins the WAR!</strong>`;
            } else if (finalPlayerCard < finalComputerCard) {
                gameMessage.innerHTML = `<strong style='color: red;'>Computer wins the WAR!</strong>`;
            } else {
                gameMessage.textContent = "Another tie! War continues...";
                setTimeout(playRound, 1000); // continiues trigger another WAR
            }
           // Show popup message for reset after one WAR event
            setTimeout(() => {
                alert("WAR battle is over! Click the Reset button to restart.");
            }, 1000);
    
        }, 500); // Delayed reveal for suspense
    }
    
};


// Event listener for button click
drawButton.addEventListener("click", playRound);

// Initial shuffle
shuffleDeck();
const resetGame = () => {
    playerContainer.innerHTML = "";
    computerContainer.innerHTML = "";
    gameMessage.textContent = "Press 'Draw Card' to start!";
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = `Player Score: ${playerScore}`;
    computerScoreElement.textContent = `Computer Score: ${computerScore}`;
    shuffleDeck(); // Reshuffle for a fresh game
};

resetButton.addEventListener("click", resetGame);

