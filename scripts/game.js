import Board from './board';
import AudioHandler from './audio-handler';
import constants from './constants';

const { BLINK, ADDING, LOST, PLAYING } = constants;
const { YELLOW, BLUE, RED, GREEN } = constants;

const colors = [RED, BLUE, YELLOW, GREEN];

class Game {
  constructor() {
    this.audioHandler = new AudioHandler();
    this.board = new Board(this.audioHandler, this.onColorClick.bind(this));
    this.status = BLINK;
    this.score = 0;
    this.startTurn = this.startTurn.bind(this);
  }

  getRandomColor() {
    const colorIndex = Math.floor(Math.random() * 4);
    return colors[colorIndex];
  }

  addNew() {
    this.sequenceIndex = 0;
    this.sequence.push(this.getRandomColor());
    this.status = BLINK;
    this.board.showLightSequence(this.sequence, this.startTurn);
  }

  start() {
    if (this.status != BLINK) throw new Error(`Invalid game action for state ${this.status}`);
    this.sequenceIndex = 0;
    this.sequence = [
      this.getRandomColor(),
      this.getRandomColor(),
      this.getRandomColor()
    ];
    this.board.showLightSequence(this.sequence, this.startTurn);
  }

  startTurn() {
    this.status = PLAYING;
  }

  increaseScore() {
    this.score += 1;
    this.board.setScore(this.score);
  }

  onColorClick(event) {
    const clickedColor = event.target.id;
    const expectedColor = this.sequence[this.sequenceIndex];

    if (this.status !== PLAYING) throw Error('Not in playing status');
    if (clickedColor !== expectedColor) throw Error('Color doesnt match');
    this.increaseScore();
    if (this.isLastSequenceColor()) return this.addNew();

    this.sequenceIndex += 1;
  }

  isLastSequenceColor() {
    return this.sequenceIndex === this.sequence.length - 1;
  }
}

export default Game;
