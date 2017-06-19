import './../styles/index.scss';
import Game from './game';
import Board from './board';

const game = new Game({ board: new Board() });
game.start();
