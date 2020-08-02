import { curry } from 'ramda';

export const AROUND = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const isValidPoint = curry((setting, x, y) => x >= 0 && y >= 0 && x < setting.width && y < setting.height);

export default curry((board, setting, fn, x, y) => {
  const valid = isValidPoint(setting);
  for (const [ox, oy] of AROUND) {
    const px = x + ox;
    const py = y + oy;
    if (valid(px, py)) {
      let ret = fn(board[px][py], px, py);
      if (ret != null) board[px][py] = ret;
    }
  }
});
