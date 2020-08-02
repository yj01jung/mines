import { Flex, Text, Button } from '@chakra-ui/core';
import { IoIosFlag } from 'react-icons/io';
import { GiBoltBomb } from 'react-icons/gi';
const cellWidth = '5vh';

import { MINE } from '../constants';

const displayColor = {
  [MINE]: 'red.500',
  0: 'gray.100',
  1: 'green.100',
  2: 'yellow.100',
  3: 'red.100',
  4: 'blue.100',
  5: 'purple.100',
};

const displayValue = (val) => (val === MINE ? <GiBoltBomb /> : val ? val : '');

function Cell({ value, opened, marked, playing, ...props }) {
  // opened = true;
  const Type = opened ? Flex : Button;
  return (
    <Type
      w={cellWidth}
      h={cellWidth}
      borderStyle="solid"
      textAlign="center"
      bg={!playing && !value ? 'gray.400' : opened ? displayColor[value] : 'gray.400'}
      borderRadius="2px"
      align="center"
      justify="center"
      isDisabled={!playing}
      {...props}
      className="btn1"
    >
      {opened ? (
        <Text fontSize="3.5vh" fontFamily="Francois One" color="gray.900">
          {displayValue(value)}
        </Text>
      ) : marked ? (
        <Text fontSize="3.5vh" fontFamily="Francois One" color="gray.900">
          <IoIosFlag />
        </Text>
      ) : null}
    </Type>
  );
}
export default Cell;
