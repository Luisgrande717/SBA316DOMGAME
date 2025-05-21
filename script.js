// Select elements
const playerCard = document.getElementById("player-card");
const computerCard = document.getElementById("computer-card");
const drawButton = document.getElementById("draw-button");
const gameMessage = document.getElementById("game-message");



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
        // Using textContent for a normal message (not needing HTML parsing)
        gameMessage.textContent = "It's a tie! Time for WAR!";
    }
};

// Event listener for button click
drawButton.addEventListener("click", playRound);

// Initial shuffle
shuffleDeck();
