/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score IF the number was not 1 and two 6's not rolled in a row
    if (dice === 6 && previousRoll === 6) {
      nextPlayer();
    } else if (dice !== 1) {
      // Add scores and update previous roll
      roundScore += dice;
      previousRoll = dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] = scores[activePlayer] + roundScore;
    roundScore = 0;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }

});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0]
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    if (!winningScore) {
      winningScore = 100;
    } else {
      updateMessage();
    }

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}

document.querySelector('.winning-score').addEventListener('click', function() {
  // Get value of input field
  winningScore = document.querySelector('.winning-score input').value;
  updateMessage();
});

function updateMessage() {
  if(winningScore) {
    document.querySelector('.winning-score').innerHTML = '<em>First player to ' + winningScore + ' wins!';
    document.querySelector('.winning-score').style.color = '#EB4D4D';
  }
}

/*
YOUR 3 CHALLENGES

1. A player loses his ENTIRE score when he rolls two 6 in a row. After that it's the next players turn
2. Add an input field to the HTML wherer players can set the winning score, so they can change the predefined score of 100
3. Add another dice to the game, so that there are two dices now. The player loses his current score when one of them is a 1.

*/
