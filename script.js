const game = {
  level: 0,
  score: 0,
  preSelected: null,
  checkMatching: false
};

bindCardClick();

function handleCardClick() {
  if (game.checkMatching) {
    return;
  }
  this.classList.add('card--flipped');
  const currentSelected = this;
  // click on the same card
  if (currentSelected === game.preSelected) {
    currentSelected.classList.remove('card--flipped');
    game.preSelected = null;
    return;
  }
  // check if this is the second card
  if (game.preSelected) {
    // match
    if (game.preSelected.dataset.tech === currentSelected.dataset.tech) {
      unbindCardClick(game.preSelected);
      unbindCardClick(currentSelected);
      game.preSelected = null;
      return;
    }
    // not match
    // display card for 1 sec
    game.checkMatching = true;
    setTimeout(() => {
      currentSelected.classList.remove('card--flipped');
      game.preSelected.classList.remove('card--flipped');
      game.preSelected = null;
      game.checkMatching = false;
    }, 1000);
    return;
  }

  game.preSelected = currentSelected;
}

function unbindCardClick(card) {
  card.removeEventListener('click', handleCardClick);
}

function bindCardClick() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', handleCardClick);
  });
}
