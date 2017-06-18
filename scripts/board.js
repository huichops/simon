import constants from './constants';

const { YELLOW, BLUE, RED, GREEN } = constants;

class Board {
  constructor(onColorClick) {
    this.board = document.querySelector('.simon');
    this.redButton = document.getElementById('button-red');
    this.blueButton = document.getElementById('button-blue');
    this.yellowButton = document.getElementById('button-yellow');
    this.greenButton = document.getElementById('button-green');

    this.buttons = new Map();
    this.buttons.set(RED, this.redButton);
    this.buttons.set(BLUE, this.blueButton);
    this.buttons.set(YELLOW, this.yellowButton);
    this.buttons.set(GREEN, this.greenButton);

    this.board.addEventListener('click', onColorClick);
  }

  showLightSequence(sequence, cb) {
    sequence.reduce((p, color) => {
      return p.then(() => new Promise((resolve) => {
        setTimeout(() => resolve(this.toggle(color)), 500);
      })
    ).then(() => new Promise((resolve) => {
        setTimeout(() => resolve(this.toggle(color)), 500);
      }))
    }, Promise.resolve())
    .then(cb);
  }

  toggle(color) {
    this.buttons.get(color).classList.toggle('lighted');
  }
}

export default Board;
