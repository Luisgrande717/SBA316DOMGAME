// Select elements
const playerCard = document.getElementById("player-card");
const resetButton = document.getElementById("reset-button");
const computerCard = document.getElementById("computer-card");
const drawButton = document.querySelector("#draw-button");
const gameMessage = document.querySelector("#game-message");
const playerContainer = document.querySelector("#player-container");
const computerContainer = document.querySelector("#computer-container");



// Deck of cards (simplified: 2-14, where Ace = 14, King = 13, Queen = 12, Jack = 11)
const deck = [];
for (let i = 2; i <= 14; i++) {
    deck.push(i);
}

// Function to shuffle the deck
const shuffleDeck = () => deck.sort(() => Math.random() - 0.5);

// Function to draw a card
const drawCard = () => deck[Math.floor(Math.random() * deck.length)];

const playRound = () => {

    let playerDraw = drawCard();
    let computerDraw = drawCard();

    // Display card values using textContent
    playerCard.textContent = playerDraw;
    computerCard.textContent = computerDraw;

    // Determine the winner
    if (playerDraw > computerDraw) {
        // Using innerText for immediate content update
        gameMessage.innerHTML = "<strong style='color: blue;'> Player wins this round!</strong>";
    } else if (playerDraw < computerDraw) {
        // Using innerHTML to emphasize winner message with formatting
        gameMessage.innerHTML = "<strong style='color: red;'>Computer wins this round!</strong>";
    } else {
        // Using textContent for a normal message
        gameMessage.textContent = "It's a tie! Time for WAR!";
                // WAR scenario: draw 4 additional cards
        let playerWarCards = [drawCard(), drawCard(), drawCard(), drawCard()];
        let computerWarCards = [drawCard(), drawCard(), drawCard(), drawCard()];

        // Show war cards dynamically
        playerWarCards.forEach((value) => {
            const warCard = document.createElement("div");
            warCard.classList.add("card");
            warCard.textContent = value;
            playerContainer.appendChild(warCard);
        });

        computerWarCards.forEach((value) => {
            const warCard = document.createElement("div");
            warCard.classList.add("card");
            warCard.textContent = value;
            computerContainer.appendChild(warCard);
        });

        // Final WAR card decides winner
        let finalPlayerCard = playerWarCards[3];
        let finalComputerCard = computerWarCards[3];

        setTimeout(() => {
            if (finalPlayerCard > finalComputerCard) {
                gameMessage.innerHTML = `<strong style='color: blue;'>Player wins the WAR!</strong>`;
            } else if (finalPlayerCard < finalComputerCard) {
                gameMessage.innerHTML = `<strong style='color: red;'>Computer wins the WAR!</strong>`;
            } else {
                gameMessage.textContent = "Another tie! War continues...";
                setTimeout(playRound, 2000); // Recursively trigger another WAR
            }
           // Show popup message for reset after one WAR event
            setTimeout(() => {
                alert("WAR battle is over! Click the Reset button to restart.");
            }, 1500);

        }, 1500); // Delayed reveal for suspense
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
    shuffleDeck(); // Reshuffle for a fresh game
};

resetButton.addEventListener("click", resetGame);

