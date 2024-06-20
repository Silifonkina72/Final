import { Box, Heading, Text, Stack, Image, IconButton } from '@chakra-ui/react';
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../../hooks';
import { Product } from '../../types/basketTypes';

export const OneProduct = ({item}: Product): JSX.Element  => {

  
  return (
    <div>
        <Box key={item.id} maxW="sm" borderWidth="1px" borderColor="black" shadow="md" overflow="hidden">
          <Stack direction="row" spacing={4} align="center">
            <Box>
              <Heading size="md">{item.name}</Heading>
              {/* <Text>{item.price}</Text> */}
            </Box>
            <Box>
              <IconButton aria-label="+" icon={<AddIcon />} />
              <IconButton aria-label="-" icon={<MinusIcon />} />
              <IconButton aria-label="корзина" icon={<ChevronDownIcon />} />
            </Box>
          </Stack>
        </Box>
    </div>
  );
};
