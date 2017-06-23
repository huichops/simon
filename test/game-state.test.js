import GameState from '../scripts/game-state';
import constants from '../scripts/constants';

const { BLINK, ADDING, LOST, PLAYING } = constants;

const increaseScore = (state, times) => {
  for(let i = 0; i < times; i += 1) state.increaseScore();
};

test('Try to increase score on BLINK status', () => {
  const state = new GameState();
  state.increaseScore();
  expect(state.getState().score).toBe(0);
});

test('Increase score on PLAYING status', () => {
  const state = new GameState();
  state.changeStatus(PLAYING);
  increaseScore(state, 3);
  expect(state.getState().score).toBe(3);
});

test('Reset score should set hiScore', () => {
  const state = new GameState();
  state.changeStatus(PLAYING);
  increaseScore(state, 3);
  state.resetGame();
  expect(state.getState().hiScore).toBe(3);
});

test('hiScore should be preserved', () => {
  const state = new GameState();
  state.changeStatus(PLAYING);
  increaseScore(state, 3);
  state.resetGame();
  state.changeStatus(PLAYING);
  increaseScore(state, 2);
  state.resetGame();
  expect(state.getState().hiScore).toBe(3);
});

test('hiScore should be preserved', () => {
  const state = new GameState();
  state.changeStatus(PLAYING);
  increaseScore(state, 3);
  state.resetGame();
  state.changeStatus(PLAYING);
  increaseScore(state, 4);
  state.resetGame();
  expect(state.getState().hiScore).toBe(4);
});
