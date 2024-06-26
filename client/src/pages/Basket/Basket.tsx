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
import { createOrderThunk } from '../../store/thunkActions/createOrderThunk';
import { Delivery } from '../../components/Basket/Delivery';
import { YMaps } from '@pbe/react-yandex-maps';
const apiKey = '513313f4-6089-4a80-b442-af1d3277a73e';

const Basket = () => {
  const user = useAppSelector((state) => state.logSlice.user);
  const dispatch = useAppDispatch();

  const itemsSquare = useAppSelector((state) => state.basketSlice.itemsSquare);
  const itemsVolume = useAppSelector((state) => state.basketSlice.itemsVolume);

  const [totalPrice, setTotalPrice] = useState(0);

  // const [address, setAddress] = useState('');

  // const handleAddressChange = (event) => {
  //     setAddress(event.target.value);
  //   };

  const calculateTotalPrice = () => {
    let total = 0;
    if (itemsSquare) {
      total += itemsSquare.reduce(
        (acc, item) => acc + item.square * item.priceArea,
        0
      );
    }
    if (itemsVolume) {
      total += itemsVolume.reduce(
        (acc, item) => acc + item.count * item.priceVolume,
        0
      );
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [itemsSquare, itemsVolume]);

  const handleToCreate = () => {
    dispatch(
      createOrderThunk({
        user,
        allPrice: totalPriceWithDiscount,
        address: address,
        itemsSquare,
        itemsVolume,
      })
    );
  };

  return (
    <>
      <div className='types'>
        <div className='product'>
          <p style={{ fontSize: '25px' }}>Товары, рассчитанные по площади</p>
          <br></br>
          <p style={{ fontSize: '20px' }}>Обратите внимание! Площадь меняется для всех товаров сразу</p>
          {itemsSquare &&
            itemsSquare.map((item) => (
              <OneProductSquare
                key={item.model + item.id}
                item={item}
                onPriceUpdate={calculateTotalPrice}
              />
            ))}
        </div>
        <div className='product'>
          <p style={{ fontSize: '25px' }}>Товары, рассчитанные по объему</p>
          <br></br>
          <p style={{ fontSize: '20px' }}>Объем можно менять для каждого товара отдельно</p>
          <br></br>
          {itemsVolume &&
            itemsVolume.map((item) => (
              <OneProductVolum
                key={item.model + item.id}
                item={item}
                onPriceUpdate={calculateTotalPrice}
              />
            ))}
        </div>
      </div>
      <YMaps
        query={{
          load: 'package.full',
          apikey: apiKey,
        }}
      >
        <Delivery
          itemsSquare={itemsSquare}
          itemsVolume={itemsVolume}
          totalPrice={totalPrice}
        />
      </YMaps>
    </>
  );
};

export default Basket;
