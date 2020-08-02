import { SimpleGrid } from '@chakra-ui/core';
import Cell from './Cell';
import { useSelector, useDispatch } from 'react-redux';
import { openCell, markCell } from './boardSlice';
import { Fragment } from 'react';
import { partial } from 'ramda';
function Board() {
  const board = useSelector((state) => state.board);
  const playing = useSelector((state) => state.playing);
  const height = useSelector((state) => state.setting.height);
  const dispatch = useDispatch();
  function open(x, y) {
    dispatch(openCell({ x, y }));
  }
  function mark(x, y, ev) {
    dispatch(markCell({ x, y }));
    ev.preventDefault();
  }
  return (
    <SimpleGrid gridTemplateRows={`repeat(${height}, 1fr)`} spacing={1} gridAutoFlow="column">
      {board &&
        board.map((c, i1) => (
          <Fragment key={i1}>
            {c.map(({ opened, value, marked }, i2) => (
              <Cell
                value={value}
                opened={opened}
                key={i1 * 1e3 + i2}
                onClick={partial(open, [i1, i2])}
                onContextMenu={partial(mark, [i1, i2])}
                marked={marked}
                playing={playing}
              />
            ))}
          </Fragment>
        ))}
    </SimpleGrid>
  );
}
export default Board;
