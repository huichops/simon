import constants from './constants';

const { YELLOW, BLUE, RED, GREEN } = constants;

class Board {
  constructor(audioHandler, onColorClick) {
    this.board = document.querySelector('.simon');
    this.redButton = document.getElementById('button-red');
    this.blueButton = document.getElementById('button-blue');
    this.yellowButton = document.getElementById('button-yellow');
    this.greenButton = document.getElementById('button-green');
    this.score = document.getElementById('score');

    this.audioHandler = audioHandler;
    this.buttons = new Map();
    this.buttons.set(RED, this.redButton);
    this.buttons.set(BLUE, this.blueButton);
    this.buttons.set(YELLOW, this.yellowButton);
    this.buttons.set(GREEN, this.greenButton);

    this.board.addEventListener('click', onColorClick);
  }

  showLightSequence(sequence, cb) {
    sequence.reduce((p, color) => {
      return p.then(() => this.playSound(color))
        .then(() => this.setLighted(color))
        .then(() => this.unsetLighted(color));
    }, Promise.resolve())
    .then(cb);
  }

  playSound(color) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.audioHandler.playNote(color)), 100);
    });
  }

  setLighted(color) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.buttons.get(color).classList.add('lighted')), 100);
    });
  }

  unsetLighted(color) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.buttons.get(color).classList.remove('lighted')), 500);
    });
  }

  setScore(score) {
    this.score.innerText = score;
  }
}

export default Board;
