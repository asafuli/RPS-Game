const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
};

function getComputerChoice() {
  const rand = Math.floor(Math.random() * choices.length);
  return rand === 0 ? 'rock' : rand === 1 ? 'paper' : 'scissors';
}

function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    return c === 'paper' ? 'computer' : 'player';
  } else if (p === 'paper') {
    return c === 'scissors' ? 'computer' : 'player';
  } else if (p === 'scissors') {
    return c === 'rock' ? 'computer' : 'player';
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    //Inc player score
    scoreboard.player++;
    //Show modal result
    result.innerHTML = `
    <h1 class="text-win">You Win</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${computerChoice}</strong></p>
    `;
  } else if (winner === 'computer') {
    //Inc computers score
    scoreboard.computer++;
    //Show modal result
    result.innerHTML = `
    <h1 class="text-lose">You lose</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${computerChoice}</strong></p>
    `;
  } else {
    //Show modal result
    result.innerHTML = `
    <h1>Its a Draw</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${computerChoice}</strong></p>
    `;
  }
  // Show score
  score.innerHTML = `
  <p>Player: ${scoreboard.player}</p>
  <p>Computer: ${scoreboard.computer}</p>
  `;

  modal.style.display = 'block';
}

function clearModal(e) {
  //console.log(e.target);
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
  <p>Player: 0</p>
  <p>Compurer: 0</p>
  `;
}

// Play game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
  // console.log(playerChoice, computerChoice, winner);
}

//Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
