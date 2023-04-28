// 게임 상태 변수
let deck = [];
let playerHand = [];
let dealerHand = [];
let dealerOpenCard = false;

// DOM 요소 변수
const playerHandDisplay = document.getElementById("player-hand");
const dealerHandDisplay = document.getElementById("dealer-hand");
const playerScoreDisplay = document.getElementById("player-score");
const dealerScoreDisplay = document.getElementById("dealer-score");
const resultDisplay = document.getElementById("result");

// 게임 초기화 함수
function initGame() {
  deck = createDeck();
  shuffleDeck(deck);
  playerHand = [dealCard(), dealCard()];
  dealerHand = [dealCard(), dealCard()];
  dealerOpenCard = false;
  updatePlayerHand();
  updateDealerHand();
  updateScore();
}

// 카드 덱 생성 함수
function createDeck() {
  let deck = [];
  const suits = ["hearts", "clubs", "diamonds", "spades"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = {value: values[j], suit: suits[i]};
      deck.push(card);
    }
  }
  return deck;
}

// 카드 섞기 함수
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// 카드 합 구하기 함수
function getHandValue(hand) {
  let value = 0;
  let aces = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value === "A") {
      aces++;
    }
    else if (["K", "Q", "J"].includes(hand[i].value)) {
      value += 10;
    }
    else {
      value += parseInt(hand[i].value);
    }
  }
  for (let i = 0; i < aces; i++) {
    if (value + 11 <= 21) {
      value += 11;
    }
    else {
      value += 1;
    }
  }
  return value;
}

// 카드 한장 뽑기 함수
function dealCard() {
  const card = deck.shift();
  return card;
}

// 딜러 카드 한장 뽑기 함수
function dealDealerCard() {
  const card = deck.shift();
  dealerHand.push(card);
  updateDealerHand();
}

// 플레이어 카드 한장 뽑기 함수
function dealPlayerCard() {
  const card = deck.shift();
  playerHand.push(card);
  updatePlayerHand();
}

// 딜러 카드 오픈 함수
function openDealerCard() {
  dealerOpenCard = true;
  updateDealerHand();
}

// 게임 결과 메시지 출력 함수
function showResult() {
  if (getHandValue(playerHand) > 21) {
    resultDisplay.innerHTML = "You bust!";
  }
  else if (getHandValue(playerHand) === getHandValue(dealerHand)) {
    resultDisplay
// Hit 버튼 클릭 이벤트 처리
hitButton.addEventListener("click", function() {
  dealPlayerCard();
  const playerScore = getHandValue(playerHand);
  playerScoreDisplay.innerHTML = "Score: " + playerScore;
  if (playerScore > 21) {
    openDealerCard();
    showResult();
  }
});

// Stand 버튼 클릭 이벤트 처리
standButton.addEventListener("click", function() {
  while (getHandValue(dealerHand) < 17) {
    dealDealerCard();
  }
  openDealerCard();
  showResult();
});

// Reset 버튼 클릭 이벤트 처리
resetButton.addEventListener("click", function() {
  deck = createDeck();
  shuffleDeck(deck);
  playerHand = [];
  dealerHand = [];
  dealerOpenCard = false;
  updatePlayerHand();
  updateDealerHand();
  playerScoreDisplay.innerHTML = "";
  dealerScoreDisplay.innerHTML = "";
  resultDisplay.innerHTML = "";
});

// 딜러 카드 1장 오픈 이벤트 처리
dealerCard1.addEventListener("click", function() {
  if (!dealerOpenCard) {
    dealerOpenCard = true;
    updateDealerHand();
  }
});
