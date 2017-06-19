import Board from './board';
import BoardHandler from './board-handler';
import constants from './constants';

const { BLINK, ADDING, LOST, PLAYING } = constants;
const { YELLOW, BLUE, RED, GREEN } = constants;

const colors = [RED, BLUE, YELLOW, GREEN];

class Game {
  constructor({ Board }) {
    this.boardHandler = new BoardHandler({
      board: new Board(this.onColorClick.bind(this))
    });
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
    this.boardHandler.showLightSequence(this.sequence, this.startTurn);
  }

  start() {
    if (this.status != BLINK) throw new Error(`Invalid game action for state ${this.status}`);
    this.sequenceIndex = 0;
    this.sequence = [
      this.getRandomColor(),
      this.getRandomColor(),
      this.getRandomColor()
    ];
    this.boardHandler.showLightSequence(this.sequence, this.startTurn);
  }

  startTurn() {
    this.status = PLAYING;
  }

  increaseScore() {
    this.score += 1;
    this.boardHandler.setScore(this.score);
  }

  resetGame() {
    this.status = BLINK;
    this.score = 0;
    this.boardHandler.setScore(this.score);
    this.start();
  }

  onColorClick(event) {
    const clickedColor = this.boardHandler.getClickedColor(event);
    const expectedColor = this.sequence[this.sequenceIndex];

    if (this.status !== PLAYING) throw Error('Not in playing status');
    if (clickedColor !== expectedColor) {
      this.resetGame();
      throw Error('Color doesnt match');
    }
    this.increaseScore();
    if (this.isLastSequenceColor()) return this.addNew();

    this.sequenceIndex += 1;
  }

  isLastSequenceColor() {
    return this.sequenceIndex === this.sequence.length - 1;
  }
}

export default Game;
