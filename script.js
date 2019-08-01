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
  isPlaying: false,
  cardSet:[],
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
  var cards = shuffle(CARD_TECHS).slice(0,2);
  console.log(cards);
  game.cardSet = shuffle(cards.concat(cards));
  console.log(game.cardSet);

  var gameBoard = document.querySelector(".game-board")
  var carIndex = 0;
  for (var i = 0; i < cardRows; i++ ) {
    var cardRowDiv = document.createElement('div');
    // gameBoard.appendChild(cardRowDiv);
    gameBoard.style['grid-template-columns'] = `repeat(${cardRows}, 1fr)`;
    gameBoard.style['grid-template-rows'] = `repeat(${cardRows}, 1fr)`;

    for (var j = 0; j < cardRows; j++) {
      var cardDiv = document.createElement('div');
      gameBoard.appendChild(cardDiv).setAttribute('class', 'card ' + game.cardSet[carIndex]);
      // cardRowDiv.style['grid-template-columns'] = 'repeat(${cardRows}), 1fr)';

      const cardFront = document.createElement('div');
      const cardBack = document.createElement('div');
      cardFront.classList.add('card__face', 'card__face--front');
      cardBack.classList.add('card__face', 'card__face--back');

      cardDiv.appendChild(cardFront);
      cardDiv.appendChild(cardBack);

      console.log(carIndex)
      carIndex++;

    }
  }

}


function handleCardFlip() {}

function nextLevel() {}

function handleGameOver() {
  game.isPlaying = false
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

function unBindCardClick(card) {}

function bindCardClick() {}


function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
