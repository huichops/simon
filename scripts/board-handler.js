import AudioHandler from './audio-handler';
import constants from './constants';

const { YELLOW, BLUE, RED, GREEN } = constants;

class BoardHandler {
  constructor({ board }) {
    this.board = board;
    this.audioHandler = new AudioHandler();
  }

  getClickedColor(event) {
    return this.board.getClickedColor(event);
  }

  showLightSequence(sequence, cb) {
    sequence.reduce((p, color) => {
      return p.then(() => this.playSound(color))
        .then(() => this.board.setLighted(color))
        .then(() => this.board.unsetLighted(color))
    }, Promise.resolve())
    .then(cb);
  }

  lightColor(color) {
    return Promise.resolve().then(() => this.playSound(color))
      .then(() => this.board.setLighted(color))
      .then(() => this.board.unsetLighted(color));
  }

  playSound(color) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.audioHandler.playNote(color)), 100);
    });
  }

  setScore(score) {
    this.board.setScore(score);
  }
}

export default BoardHandler;
