
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
import { addItem } from '../../store/slices/basketSlice';
import { Product } from '../../types/basketTypes';
import { OneProduct } from '../../components/Basket/OneProduct';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {} from './Basket.css';
import { OneProductSquare } from '../../components/Basket/OneProductSquare';
import { OneProductVolum } from '../../components/Basket/OneProductVolum';
import { useEffect, useState } from 'react';

const Basket = () => {
  const dispatch = useAppDispatch();

  const itemsSquare = useAppSelector((state) => state.basketSlice.itemsSquare);
  const itemsVolume = useAppSelector((state) => state.basketSlice.itemsVolume);

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let total = 0;
    if (itemsSquare) {
      total += itemsSquare.reduce((acc, item) => acc + item.square * item.priceArea, 0);
    }
    if (itemsVolume) {
      total += itemsVolume.reduce((acc, item) => acc + item.count * item.priceVolume, 0);
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [itemsSquare, itemsVolume]);

  const discountThreshold = 30000;
  const discountRate = 0.1;
  const isDiscountApplicable = totalPrice > discountThreshold;
  const discountAmount = isDiscountApplicable ? totalPrice * discountRate : 0;
  const totalPriceWithDiscount = totalPrice - discountAmount;

  return (
    <>
      <div className='types'>
        <div className='product'>
          {itemsSquare &&
            itemsSquare.map((item) => (
              <OneProductSquare key={item.model + item.id} item={item} onPriceUpdate={calculateTotalPrice}/>
            ))}
        </div>
        <div>
          {itemsVolume &&
            itemsVolume.map((item) => (
              <OneProductVolum key={item.model + item.id} item={item} onPriceUpdate={calculateTotalPrice}/>
            ))}
        </div>
      </div>
      <Box p={5} maxWidth='500px' mx='auto'>
        <FormControl mb={5}>
          <FormLabel>Адрес доставки</FormLabel>
          <Input value='address' placeholder='Введите адрес доставки' />
          <Button colorScheme='blue' 
          // onClick={handleCalculateShipping}
          >
            Рассчитать стоимость доставки
          </Button>
        </FormControl>

        <Text mb={5}>Цена товара: {totalPrice}</Text>

        <Text mb={5}>При покупке больше 30000 скидка 10%</Text>
        {isDiscountApplicable ? (
          <>
            <Text mb={5}>Сумма скидки: {discountAmount}</Text>
            <Text mb={5} fontWeight='bold'>
              Цена с учетом скидки: {totalPriceWithDiscount}
            </Text>
          </>
        ) : (
          <>
            <Text mb={5}>Сумма скидки: 0</Text>
            <Text mb={5} fontWeight='bold'>
              Цена с учетом скидки: {totalPrice}
            </Text>
          </>
        )}

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
