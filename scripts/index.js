import './../styles/index.scss';
import Game from './game';
import HtmlBoard from './board';

const game = new Game({ Board: HtmlBoard });
game.start();
