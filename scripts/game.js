import Board from './board';
import BoardHandler from './board-handler';
import GameState from './game-state';
import constants from './constants';

const { BLINK, ADDING, LOST, PLAYING } = constants;
const { YELLOW, BLUE, RED, GREEN } = constants;

const colors = [RED, BLUE, YELLOW, GREEN];

class Game {
  constructor({ Board }) {
    this.boardHandler = new BoardHandler({
      board: new Board(this.onColorClick.bind(this)),
    });
    this.gameState = new GameState();
    this.boardHandler.presentHiScore(this.gameState.getState().hiScore);
    this.startTurn = this.startTurn.bind(this);
  }

  getRandomColor() {
    const colorIndex = Math.floor(Math.random() * 4);
    return colors[colorIndex];
  }

  addNew() {
    this.sequenceIndex = 0;
    this.sequence.push(this.getRandomColor());
    this.gameState.changeStatus(BLINK);
    this.boardHandler.showLightSequence(this.sequence, this.startTurn);
  }

  start() {
    const { status } = this.gameState.getState();
    if (status != BLINK) throw new Error(`Invalid game action for state ${this.status}`);
    this.sequenceIndex = 0;
    this.sequence = [
      this.getRandomColor(),
      this.getRandomColor(),
      this.getRandomColor(),
    ];
    this.boardHandler.showLightSequence(this.sequence, this.startTurn);
  }

  startTurn() {
    this.gameState.changeStatus(PLAYING);
  }

  increaseScore() {
    this.gameState.increaseScore();
    this.boardHandler.presentScore(this.gameState.getState().score);
  }

  resetGame() {
    const { score, hiScore } = this.gameState.getState();
    this.boardHandler.presentScore(score);
    this.boardHandler.presentHiScore(hiScore);
    this.start();
  }

  onColorClick(event) {
    const { status } = this.gameState.getState();
    if (status !== PLAYING) return false;
    const clickedColor = this.boardHandler.getClickedColor(event);
    const expectedColor = this.sequence[this.sequenceIndex];
    if (clickedColor !== expectedColor) {
      this.gameState.resetGame();
      this.resetGame();
      throw Error('Color doesnt match');
    }
    this.increaseScore();
    if (this.isLastSequenceColor()) return this.addNew();
    this.gameState.changeStatus(BLINK);
    this.boardHandler.lightColor(clickedColor)
      .then(() => {
        if (clickedColor !== expectedColor) throw new Error('Color does not match');
        if (this.isLastSequenceColor()) return this.addNew();
        this.sequenceIndex += 1;
        this.gameState.changeStatus(PLAYING);
      });

  }

  isLastSequenceColor() {
    return this.sequenceIndex === this.sequence.length - 1;
  }
}

export default Game;
