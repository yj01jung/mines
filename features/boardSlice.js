import { createSlice } from '@reduxjs/toolkit';
import createBoard from './createBoard';
import { map, all } from 'ramda';
import { isValidPoint, AROUND } from './around';
import { MINE } from '../constants';

const mapper = map(map((value) => ({ value, opened: false, marked: false })));

/**@enum*/
const Result = {
  Fail: 'fail',
  Success: 'success',
  None: null,
};
const canFinish = (it) => {
  console.log('heavy');
  return all(all((e) => (e.value === MINE ? e.marked : e.opened)))(it);
};
const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: null,
    setting: {},
    playing: false,
    result: Result.None,
  },
  reducers: {
    startGame(state, action) {
      state.setting = action.payload;
      state.playing = true;
      state.board = mapper(createBoard(action.payload));
      state.minesLeft = state.setting.mineCount;
      state.result = null;
    },
    home(state, action) {
      state.board = null;
      state.setting = {};
      state.playing = false;
      state.result = Result.None;
    },
    openCell(state, action) {
      const gx = action.payload.x,
        gy = action.payload.y;
      const current = state.board[gx][gy];
      if (current.marked) return;
      if (current.opened) {
        state.board[gx][gy].opened = false; // open near cell
      }
      const validate = isValidPoint(state.setting);
      open(gx, gy);
      function open(x, y) {
        if (state.board[x][y].opened || state.board[x][y].marked) return;
        state.board[x][y].opened = true;
        if (state.board[x][y].value === MINE) {
          boardSlice.caseReducers.stopGame(state);
        } else {
          boardSlice.caseReducers.checkFinishGame(state);
        }
        for (const [offsetX, offsetY] of AROUND) {
          const cx = x + offsetX,
            cy = y + offsetY;
          if (validate(cx, cy) && state.board[cx][cy].value === MINE && !state.board[cx][cy].marked) return;
        }
        for (const [offsetX, offsetY] of AROUND) {
          const cx = x + offsetX,
            cy = y + offsetY;
          if (validate(cx, cy)) open(cx, cy);
        }
        boardSlice.caseReducers.checkFinishGame(state);
      }
    },
    markCell(state, action) {
      const gx = action.payload.x,
        gy = action.payload.y;
      if (!state.board[gx][gy].marked) {
        state.board[gx][gy].marked = true;
        state.minesLeft -= 1;
        boardSlice.caseReducers.checkFinishGame(state);
      } else {
        state.board[gx][gy].marked = false;
        state.minesLeft += 1;
      }
    },
    stopGame(state) {
      if (!state.playing) return;
      state.playing = false;
      state.minesLeft = 0;
      state.result = Result.Fail;
      for (const row of state.board) {
        for (const cell of row) {
          if (!cell.marked && cell.value === MINE) {
            cell.opened = true;
          }
        }
      }
    },
    checkFinishGame(state) {
      if (!state.playing) return;
      if (state.minesLeft === 0 && canFinish(state.board)) {
        state.playing = false;
        state.result = Result.Success;
      }
    },
  },
});
export default boardSlice.reducer;

export const { startGame, openCell, markCell, home } = boardSlice.actions;
