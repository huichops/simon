import { RED, BLUE, YELLOW, GREEN } from './constants';
export default class UIHandler {
  constructor() {
    this.redButton = document.getElementById('button-red');
    this.blueButton = document.getElementById('button-blue');
    this.yellowButton = document.getElementById('button-red');
    this.greenButton = document.getElementById('button-green');
    this.buttons = new Map();
    this.buttons.set(RED, this.redButton);
    this.buttons.set(BLUE, this.blueButton);
    this.buttons.set(YELLOW, this.yellowButton);
    this.buttons.set(GREEN, this.greenButton);
  }
  
  lightSequence(sequence, cb) {
    sequence.reduce((p, s) => {
      return p.then(() => new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.turn(s));
        }, 500);
      })
    ).then(() => new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.turn(s));
        }, 500);
      }))
    }, Promise.resolve());
  }

  turn(color) {
    console.log(this.buttons);
    this.buttons.get(color).classList.toggle('lighted');
  }
}