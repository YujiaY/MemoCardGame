// css class for different card image
const CARD_TECHS = [
  'html5',
  'css3',
  'js',
  'sass',
  'nodejs',
  'react',
  'linkedin',
  'heroku',
  'github',
  'aws'
];

// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  initLevel: 1,
  currentLevel: 1,
  remainedTime: 60,
  timerDisplay: null,
  scoreDisplay: null,
  levelDisplay: null,
  timerInterval: null,
  startButton: null,
  // and much more
  firstChoice: null,
  secondChoice: null,
  isMatching: false,
  isPlaying: false,
  cardSet:[],
  flippedCardsCount:0,
};

setGame();

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  bindStartButton();
}

function startGame() {
  displayDeck();
  // Note! Do not bind below !
  // bindStartButton();

  // startTimer();
  game.isPlaying = true;
  bindCardClick();
}

function displayDeck() {
  var gameBoard = document.querySelector('.game-board');
  // gameBoard.innerHTML = '';
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
  displayCards();
}

function displayCards () {
  var cardRows = game.currentLevel * 2;
  var CARD_TECHS_shuffled = shuffle(CARD_TECHS);
  var cardsCount = Math.pow(cardRows, 2);
  var cardSet = [];
  for (var i =0; i < cardsCount / 2; i++) {
    cardSet.push(CARD_TECHS_shuffled[ i % CARD_TECHS.length]);
    cardSet.push(CARD_TECHS_shuffled[ i % CARD_TECHS.length]);
  }
  game.cardSet = shuffle(cardSet);
  console.log(game.cardSet);

  var gameBoard = document.querySelector(".game-board")
  var cardIndex = 0;
  for (var i = 0; i < cardRows; i++ ) {
    var cardRowDiv = document.createElement('div');
    // gameBoard.appendChild(cardRowDiv);
    gameBoard.style['grid-template-columns'] = `repeat(${cardRows}, 1fr)`;
    gameBoard.style['grid-template-rows'] = `repeat(${cardRows}, 1fr)`;

    for (var j = 0; j < cardRows; j++) {
      var cardDiv = document.createElement('div');
      gameBoard.appendChild(cardDiv).setAttribute('class', 'card ' + game.cardSet[cardIndex]);
      // cardRowDiv.style['grid-template-columns'] = 'repeat(${cardRows}), 1fr)';

      const cardFront = document.createElement('div');
      const cardBack = document.createElement('div');
      cardFront.classList.add('card__face', 'card__face--front');
      cardBack.classList.add('card__face', 'card__face--back');
      cardDiv.dataset.techType = game.cardSet[cardIndex];

      cardDiv.appendChild(cardFront);
      cardDiv.appendChild(cardBack);

      cardIndex++;

    }
  }

}


function handleCardFlip() {}

function nextLevel() {
  console.log('We are going to the next Level!');
  game.currentLevel += 1;
  game.flippedCardsCount = 0;
  displayDeck();
}

function handleGameOver() {
  game.isPlaying = false
}

function clickHandler(event) {
  var target = event.target;
  var currentCard = target.parentNode;
  console.log(currentCard);
  if (!currentCard.classList.contains('card')) {
    return;
  }
  if (currentCard.classList.contains('card--flipped')) {
    return;
  }
  currentCard.classList.add('card--flipped');
  if (!game.firstChoice) {
  game.firstChoice = currentCard.dataset.techType;
  return;
  }

  if (game.firstChoice === currentCard.dataset.techType) {
    handleMatch();
  } else if (game.firstChoice != currentCard.dataset.techType) {
    unBindCardClick();
    setTimeout(()=> {
      handleNotMatch();
      bindCardClick();
    },1000);
  }
}
/*******************************************
/     UI update
/******************************************/
function updateScore() {}

function updateTimerDisplay() {}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {
  var statusButton = document.querySelector('.game-stats__button');
  statusButton.addEventListener('click', function(event) {
    var gameStatus = statusButton.innerHTML;
    if (game.isPlaying === false && gameStatus === 'New Game') {
      statusButton.innerHTML = 'End Game';
      startGame();
    } else if (game.isPlaying === true && gameStatus === 'End Game') {
      statusButton.innerHTML = 'New Game';
      console.log('End to New.')
      handleGameOver();
    }
  })
}

function unBindCardClick() {
  var gameBoard = document.querySelector('.game-board');
  gameBoard.removeEventListener('click',clickHandler, false);
}

function bindCardClick() {
  var gameBoard = document.querySelector('.game-board');
  gameBoard.addEventListener('click', clickHandler, false);
}

function handleMatch() {
  console.log('matched!');
  var matchedCards = document.querySelectorAll('.card--flipped .card__face--front');
  matchedCards.forEach((e) => {
    e.classList.remove('card__face--front');
    console.log(e.classList);
  });
  game.firstChoice = null;
  game.secondChoice = null;
  game.flippedCardsCount += 2;
  console.log(game.flippedCardsCount);
  if (game.flippedCardsCount === game.cardSet.length) {
    setTimeout(() => {
      nextLevel();
    }, 1000);
  }
}

function handleNotMatch() {
  console.log('Not Matched!');
  var unmatchedCards = document.querySelectorAll('.card--flipped .card__face--front');
  unmatchedCards.forEach((e) => {
    // e.classList.remove('.card--flipped');
    // console.log(e.classList);
    console.log(e.parentElement)
    e.parentElement.classList.remove('card--flipped');
  })
  game.firstChoice = null;
  game.secondChoice = null;

}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
