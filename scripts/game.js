import Board from './board';
import constants from './constants';

const { BLINK, ADDING, LOST, PLAYING } = constants;
const { YELLOW, BLUE, RED, GREEN } = constants;

const colors = [RED, BLUE, YELLOW, GREEN];

class Game {
  constructor() {
    this.board = new Board(this.onColorClick.bind(this));
    this.gameState = BLINK;
  }

  getRandomColor() {
    const colorIndex = Math.floor(Math.random() * 4);
    return colors[colorIndex];
  }

  addNew() {
    this.sequenceIndex = 0;
    this.sequence.push(this.getRandomColor());
    this.board.showLightSequence(this.sequence, this.startTurn.bind(this));
  }

  start() {
    if (this.gameState != BLINK) throw new Error(`Invalid game action for state ${this.gameState}`);
    this.sequenceIndex = 0;
    this.sequence = [
      this.getRandomColor(),
      this.getRandomColor(),
      this.getRandomColor()
    ];
    this.board.showLightSequence(this.sequence, this.startTurn.bind(this));
  }

  startTurn() {
    this.gameState = PLAYING;
  }

  onColorClick(event) {
    const clickedColor = event.target.id;
    const expectedColor = this.sequence[this.sequenceIndex];

    if (clickedColor !== expectedColor) throw Error('Color doesnt match');
    if (this.isLastSequenceColor()) return this.addNew();

    this.sequenceIndex += 1;
  }

  isLastSequenceColor() {
    return this.sequenceIndex === this.sequence.length - 1;
  }
}

export default Game;
