/**
 * index.js
 * - All our useful JS goes here, awesome!
 */

// Game states
import './../styles/index.scss';
import constants from './constants';

const { YELLOW, BLUE, RED, GREEN } = constants;
const { BLINK, ADDING, LOST, PLAYING } = constants;
const colors = [RED, BLUE, YELLOW, GREEN];

class Game {
  constructor() {
    this.gameState = BLINK;
    this.sequence = [];
    this.sequenceIndex = 0;
    this.board = document.querySelector('.simon');
    this.redButton = document.getElementById('button-red');
    this.blueButton = document.getElementById('button-blue');
    this.yellowButton = document.getElementById('button-red');
    this.greenButton = document.getElementById('button-green');
    this.buttons = new Map();
    this.buttons.set(RED, this.redButton);
    this.buttons.set(BLUE, this.blueButton);
    this.buttons.set(YELLOW, this.yellowButton);
    this.buttons.set(GREEN, this.greenButton);

    this.setHandlers();
  }

  getRandomColor() {
    const colorIndex = Math.floor(Math.random() * 4);
    return colors[colorIndex];
  }

  addNew() {
    if (this.gameState != BLINK)
      throw new Error(`Invalid game action for state ${this.gameState}`);
    this.sequence.push(this.getRandomColor());
    this.lightSequence(this.sequence, this.startTurn.bind(this));
  }

  start() {
    if (this.gameState != BLINK)
      throw new Error(`Invalid game action for state ${this.gameState}`);
    this.sequence.push(this.getRandomColor());
    this.sequence.push(this.getRandomColor());
    this.sequence.push(this.getRandomColor());
    this.lightSequence(this.sequence, this.startTurn.bind(this));
  }

  startTurn() {
    console.warn(this.sequence);
    this.gameState = PLAYING;
    this.sequenceIndex = 0;
  }

  setHandlers(sequence) {
    this.board.addEventListener('click', (event) => {
      if (this.sequence[this.sequenceIndex] !== event.target.id)
        throw Error('ah se mamo');
      this.sequenceIndex += 1;
    });
  }

  lightSequence(sequence, cb) {
    sequence.reduce((p, s) => {
      return p.then(() => new Promise((resolve) => {
        setTimeout(() => resolve(this.toggle(s)), 500);
      })
    ).then(() => new Promise((resolve) => {
        setTimeout(() => resolve(this.toggle(s)), 500);
      }))
    }, Promise.resolve())
    .then(cb);
  }

  toggle(color) {
    this.buttons.get(color).classList.toggle('lighted');
  }
}

const game = new Game();
game.start();
