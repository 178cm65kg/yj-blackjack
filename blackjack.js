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
