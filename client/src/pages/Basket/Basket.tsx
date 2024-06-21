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
import { } from './Basket.css';
import { addItem } from '../../store/slices/basketSlice';
import { Product } from '../../types/basketTypes';
import { OneProduct } from '../../components/Basket/OneProduct';

const Basket = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.basketSlice.items);
  console.log('itemsss', items);

  return (
    <>
      <div>
        {items.map((item) => (
          <OneProduct key={item.model + item.id} item={item} />
        ))}
      </div>
      <Box p={5} maxWidth='500px' mx='auto'>

        <FormControl mb={5}>
          <FormLabel>Адрес доставки</FormLabel>
          <Input
            value='address'
            placeholder='Введите адрес доставки'
          />
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
