import constants from './constants';
const { BLINK, ADDING, LOST, PLAYING } = constants;

const validStatus= [ BLINK, ADDING, LOST, PLAYING ];

const getInitialHiScore = () => {
  if (window && window.localStorage) {
    return localStorage.getItem('hiScore') || 0;
  }
  return 0;
}

const saveHiScore = (hiScore) => {
  if (window && window.localStorage) {
    localStorage.setItem('hiScore', hiScore);
  }
}

class GameState {
  constructor() {
    this.status =  BLINK;
    this.score = 0;
    this.hiScore = getInitialHiScore();
  }

  changeStatus(status) {
    if (validStatus.includes(status)) {
      this.status = status;
    }
  }

  resetGame() {
    this.status = BLINK;
    this.hiScore = Math.max(this.score, this.hiScore);
    saveHiScore(this.hiScore);
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
