import { MINE } from '../constants';
import around from './around';

const randInt = (min, max) => min + Math.floor(Math.random() * (++max - min));

const increaseIfNotMine = (v) => (v !== MINE ? v + 1 : MINE);

function createBoard({ width, height, mineCount }) {
  const setting = { width, height, mineCount };
  const board = [];
  for (let i = 0, col; i < width; i++) {
    col = board[i] = [];
    for (let j = 0; j < height; j++) col[j] = 0;
  }
  let idx = mineCount;
  const increaseAround = around(board, setting, increaseIfNotMine);
  while (idx--) {
    const x = randInt(0, width - 1);
    const y = randInt(0, height - 1);
    if (board[x][y] === MINE) {
      ++idx;
    } else {
      board[x][y] = MINE;
      increaseAround(x, y);
    }
  }
  return board;
}
export default createBoard;
