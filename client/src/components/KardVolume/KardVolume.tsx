import { useState } from 'react';
import { Button, Box, Image, Badge, Flex } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  countPriceAdd,
  countPriceRem,
  ProductVolume,
  resetBasket,
} from '../../store/slices/basketSlice';
interface Props {
  productVolume: ProductVolume;
}
function KardVolume({
  productVolume: { priceVolume, id, img, name, model },
}: Props) {
  console.log({ priceVolume, id, img, name, model });

  //? это массивы из хранилища
  const { allPrice: itemPrice } = useAppSelector((state) => state.basketSlice);

  const dispatch = useAppDispatch();

  //? счетчик
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    dispatch(countPriceAdd({ id: Number(id), model, count }));
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      dispatch(countPriceRem({ id: Number(id), model, count }));
    }
  };

  return (
    <>
      <Box
        key={`${model}-${Number(id)}`}
        maxW='sl'
        w='590px'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        mb='4'
      >
        <Flex>
          <Image src={img} alt='Card image' boxSize='174px' objectFit='cover' />

          <Box p='6'>
            <Box display='flex' alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal'>
                {model}
              </Badge>
            </Box>

            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              {name}
            </Box>
            <Box>
              {priceVolume} руб/л
              <Box as='span' color='gray.600' fontSize='sm'></Box>
            </Box>

            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              Объем: {count}
            </Box>
            <Box>
              {priceVolume * count} руб/л
              <Box as='span' color='gray.600' fontSize='sm'></Box>
            </Box>
            <Button
              size='sm'
              minWidth='32px'
              height='32px'
              colorScheme='teal'
              onClick={handleIncrement}
            >
              +
            </Button>
            <Button
              size='sm'
              minWidth='32px'
              height='32px'
              colorScheme='teal'
              onClick={handleDecrement}
            >
              -
            </Button>

            <Box display='flex' mt='2' alignItems='center'></Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default KardVolume;
