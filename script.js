// script.js
document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-button");
  const cardsArray = [
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "H",
    "H",
  ];
  let flippedCards = [];
  let matchedCards = [];

  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const createBoard = () => {
    gameBoard.innerHTML = "";
    shuffleCards(cardsArray);
    cardsArray.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.dataset.card = card;
      cardElement.addEventListener("click", flipCard);
      gameBoard.appendChild(cardElement);
    });
  };

  const flipCard = (event) => {
    const clickedCard = event.target;
    if (!clickedCard.classList.contains("flipped") && flippedCards.length < 2) {
      clickedCard.classList.add("flipped");
      clickedCard.textContent = clickedCard.dataset.card;
      flippedCards.push(clickedCard);

      if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
      }
    }
  };

  const checkForMatch = () => {
    const [card1, card2] = flippedCards;
    if (card1.dataset.card === card2.dataset.card) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedCards.push(card1, card2);
      if (matchedCards.length === cardsArray.length) {
        alert("You won!");
      }
    } else {
      card1.classList.remove("flipped");
      card1.textContent = "";
      card2.classList.remove("flipped");
      card2.textContent = "";
    }
    flippedCards = [];
  };

  restartButton.addEventListener("click", createBoard);

  createBoard();
});
