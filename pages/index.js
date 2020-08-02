import Board from '../features/Board';
import { Flex, Heading, Button, Stack, RadioGroup, Radio, Text, Link, Divider } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, home } from '../features/boardSlice';
import { useState } from 'react';
const LEVELS = {
  easy: { width: 10, height: 10, mineCount: 12 },
  medium: { width: 16, height: 10, mineCount: 20 },
  hard: { width: 16, height: 16, mineCount: 40 },
  extreme: { width: 30, height: 16, mineCount: 99 },
};
export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((e) => e);
  const [level, setLevel] = useState('easy');
  function start() {
    dispatch(startGame(LEVELS[level]));
  }
  function gohome() {
    dispatch(home());
  }
  return (
    <div>
      <Flex direction="column" align="center" h="100vh" justifyContent="center" bg="gray.700">
        {state.board ? (
          <>
            <Stack isInline m={3} align="center" spacing={3}>
              <Heading color="white" m={2}>
                {state.result === 'fail'
                  ? 'Game Over'
                  : state.result === 'success'
                  ? 'Clear!'
                  : `${state.minesLeft} Left`}
              </Heading>

              <Button onClick={start} flex={1} variantColor="red" size="lg">
                New Game
              </Button>
              <Button onClick={gohome} flex={1} size="lg">
                Home
              </Button>
            </Stack>
            <Board />
          </>
        ) : (
          <Stack spacing={2}>
            <Heading>Minesweeper</Heading>
            <Text color="gray.200">Only works for PC</Text>
            <Divider my={3} />
            <RadioGroup onChange={(e) => setLevel(e.target.value)} value={level}>
              <Radio value="easy">Easy (10x10)</Radio>
              <Radio value="medium">Medium (16x10)</Radio>
              <Radio value="hard">Hard (16x10)</Radio>
              <Radio value="extreme">Extreme (30x16)</Radio>
            </RadioGroup>
            <Button onClick={start} size="lg">
              Start Game
            </Button>
            <Stack align="center" m={4} p="fixed" spacing={2}>
              <Text color="gray.300">
                created by <Link href="https://github.com/yj01jung">yj01jung</Link> in 3 hours
              </Text>
            </Stack>
          </Stack>
        )}
      </Flex>
    </div>
  );
}
