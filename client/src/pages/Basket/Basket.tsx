import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {} from './Basket.css';
import { addItem } from '../../store/slices/basketSlice';
import { Product } from '../../types/basketTypes';
import { OneProductSquare } from '../../components/Basket/OneProductSquare';
import { OneProductVolum } from '../../components/Basket/OneProductVolum';

const Basket = () => {
  const dispatch = useAppDispatch();

  const itemsSquare = useAppSelector((state) => state.basketSlice.itemsSquare);
  const itemsVolume = useAppSelector((state) => state.basketSlice.itemsVolume);

  let newItemsSquare = null;

  if (itemsSquare) {
    function addSquareToObjects(objects, square) {
      return objects.map((obj) => ({ ...obj, square }));
    }

    function result(array) {
      const newArray = [];

      for (let i = 0; i < array.length; i += 2) {
        if (
          Array.isArray(array[i]) &&
          array[i + 1] &&
          typeof array[i + 1] === 'object' &&
          array[i + 1].hasOwnProperty('square')
        ) {
          const objectsArray = array[i];
          const squareValue = array[i + 1].square;
          const updatedObjectsArray = addSquareToObjects(
            objectsArray,
            squareValue
          );
          if (array[i + 1]) {
            newArray.push(updatedObjectsArray); // Добавляем обновленный массив в newArray
          }
          // newArray.push(array[i + 1]);  // Добавляем нечетный элемент
        }
      }
      return newArray;
    }

    newItemsSquare = result(itemsSquare);
  }

  return (
    <>
      <div className='types'>
        <div>
        {itemsSquare &&
          newItemsSquare.map((array) =>
            array.map((item) => (
              <OneProductSquare key={item.model + item.id} item={item} />
            ))
          )}
        </div>
        <div>
        {itemsVolume &&
            itemsVolume.map((item) => (
              <OneProductVolum key={item.model + item.id} item={item} />
            ))
          }
        </div>
      </div>
      <Box p={5} maxWidth='500px' mx='auto'>
        <FormControl mb={5}>
          <FormLabel>Адрес доставки</FormLabel>
          {/* <Input value='address' placeholder='Введите адрес доставки' /> */}
        </FormControl>

        <Button
          colorScheme='blue'
          // onClick={handleCalculateShipping}
          mb={5}
        >
          Рассчитать стоимость доставки
        </Button>

        <Text mb={5}>Цена товара: 100</Text>
        <Text mb={5}>Цена доставки: 100</Text>
        <Text mb={5} fontWeight='bold'>
          Общая цена: 200
        </Text>

        <Button colorScheme='teal'>Оформить заказ</Button>
      </Box>
    </>
  );
};

export default Basket;
