import constants from './constants';
const { BLINK, ADDING, LOST, PLAYING } = constants;

const validStatus= [ BLINK, ADDING, LOST, PLAYING ];

class GameState {
  constructor() {
    this.status =  BLINK;
    this.score = 0;
    this.hiScore = 0;
  }

  changeStatus(status) {
    if (validStatus.includes(status)) {
      this.status = status;
    }
  }

  resetGame() {
    this.status = BLINK;
    this.hiScore = this.score > this.hiScore ? this.score : this.hiScore;
    this.score = 0;
  }

  increaseScore() {
    if (this.status === PLAYING) {
      this.score += 1;
    }
  }

  getState() {
    return {
      status: this.status,
      score: this.score,
      hiScore: this.hiScore,
    };
  }
}

export default GameState;
