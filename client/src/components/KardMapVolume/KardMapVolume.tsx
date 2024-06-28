import { useState } from "react";
import { Button, Box, Image, Badge, Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addItemsSquare,
  addItemsVolume,
  addItemPrice,
  resetBasket,
  countPriceAdd,
  countPriceRem,
} from "../../store/slices/basketSlice";

function KardMapVolume({ id, img, model, name, priceVolume }) {
  //? это массивы из хранилища
  const { allPrice: itemPrice } = useAppSelector((state) => state.basketSlice);

  const dispatch = useAppDispatch();

  //? счетчик
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(parseFloat((count + 0.1).toFixed(1)));
    dispatch(countPriceAdd({ id: Number(id), model: model }));
  };
  // item.count = parseFloat(item.count.toFixed(1));
  const handleDecrement = () => {
    if (count > 0) {
      setCount(parseFloat((count - 0.1).toFixed(1)));
      dispatch(countPriceRem({ id: Number(id), model: model }));
    }
  };

  let totalPrice = parseFloat((priceVolume * count).toFixed(1));

  return (
    <>
      <Box
        key={`${model}-${Number(id)}`}
        maxW="480px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mb="4"
        maxHeight="200px"
      >
        <Flex>
          <Image src={img} alt="Card image" boxSize="193px" objectFit="cover" />

          <Box p="4" mt="-3">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {model}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              whiteSpace="normal"
              wordWrap="break-word"
              wordBreak="break-word"
              maxWidth="400px"
            >
              {name}
            </Box>
            <Box>
           
            ({priceVolume}) руб/л
              <Box as="span" color="gray.600" fontSize="sm"></Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              
              Объем: {count}
            </Box>
            <Box>
            {/* (parseFloat((priceVolume * count).toFixed(1))); */}
              {totalPrice} руб/л
              <Box as="span" color="gray.600" fontSize="sm"></Box>
            </Box>
            <Button
              size="sm"
              minWidth="32px"
              height="32px"
              colorScheme="teal"
              mr={3}
              onClick={handleIncrement}
            >
              +
            </Button>
            <Button
              size="sm"
              minWidth="32px"
              height="32px"
              colorScheme="teal"
              onClick={handleDecrement}
            >
              -
            </Button>

            <Box d="flex" mt="2" alignItems="center"></Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default KardMapVolume;
