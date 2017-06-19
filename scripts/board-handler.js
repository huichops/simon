import constants from './constants';

const { YELLOW, BLUE, RED, GREEN } = constants;

class BoardHandler {
  constructor(args) {
    const { onColorClick, graphicBoard } = args;

    this.board = graphicBoard;
    this.buttons = new Map();
    this.buttons.set(RED, this.redButton);
    this.buttons.set(BLUE, this.blueButton);
    this.buttons.set(YELLOW, this.yellowButton);
    this.buttons.set(GREEN, this.greenButton);

    this.board.setHandlers(onColorClick);
  }

  showLightSequence() {
    sequence.reduce((p, color) => {
      return p.then(() => this.board.setLighted(color))
        .then(() => this.board.unsetLighted(color))
    }, Promise.resolve())
    .then(cb);
  }
}

export default BoardHandler;
