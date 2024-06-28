import { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createOrderThunk } from "../../store/thunkActions/createOrderThunk";
import {clearBasket} from '../../store/slices/basketSlice';
import { YMaps, withYMaps } from '@pbe/react-yandex-maps';
import { Link, useNavigate } from 'react-router-dom';
import Test from "../test";

  export const Delivery = ({ itemsSquare, itemsVolume, totalPrice }) => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.logSlice.user);
    //! 
    const calculateDistance = ({ ymaps, route }) => {
      const [routeLength, setRouteLength] = useState(null);
    
      useEffect(() => {
        let canceled = false;
        
        // console.log('1',  ymaps.route);
        // console.log('2',  Boolean(ymaps));
    
        if (ymaps && ymaps.route) {
          ymaps.route(route).then((route) => {
            
            if (!canceled) {
               
              setRouteLength(route.getHumanLength().replace('&#160;', ' ').replace(' км', ' '));
            }
          });
        }
    
        return () => {
          canceled = true;
        };
      }, [ymaps, ...route]);
      return routeLength ? (
        <>
        <p>Цена доставки</p><p className="distance">{routeLength*100}</p>
        </>
      ) : (
        <p>Считаем доставку...</p>
      );
    };
    
    const ConnectedLengthPrinter = withYMaps(calculateDistance, true, ['route']);
    
    const Test = () => {     
      return (
          <ConnectedLengthPrinter route={['Россия, город Тюмень, улица Мельникайте, дом 10', address]} />
      );
    };
    //!

    const [address, setAddress] = useState('');
    const [distance, setDistance] = useState(null);
    
    const dispatch = useAppDispatch();
  
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };
  
    const handleToCreate = () => {
      dispatch(createOrderThunk({ user, allPrice: totalPrice, address, itemsSquare, itemsVolume }));
      dispatch(clearBasket())
      navigate('/success');
    };

    const [costDelivery, setСostDelivery] = useState([]);

    const handleCalculateShipping = () => {
      const route = ['Россия, город Тюмень, улица Мельникайте, дом 10', address];
      const distanceResult = Test(address);
      setDistance(distanceResult);
      calculateCostDelivery(distanceResult);
    };

    const calculateCostDelivery = (distance) => {
      const cost = distance * 500;
      setСostDelivery(cost);
  };

    const discountThreshold = 30000;
    const discountRate = 0.1;
    const isDiscountApplicable = totalPrice > discountThreshold;
    const discountAmount = isDiscountApplicable ? Math.floor(totalPrice * discountRate) : 0;
    const totalPriceWithDiscount = totalPrice - discountAmount;
  return (
    <Box className="delBox">
      <FormControl>
        <FormLabel>Адрес доставки</FormLabel>
        <Input
          value={address}
          placeholder='Введите адрес доставки'
          onChange={handleAddressChange}
        />
        {/* <Button
          colorScheme='blue'
          onClick={handleCalculateShipping}
        >
          Рассчитать стоимость доставки
        </Button> */}
        
      </FormControl>

      <Text mb={5} fontWeight='bold'>Цена товара: {totalPrice}</Text>

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

      <Test/>
      {/* <Text mb={5} fontWeight='bold'>
        Общая цена: 200
      </Text> */}

      <Button colorScheme='teal' onClick={handleToCreate} margin='20px'>
        Оформить заказ
      </Button>
    </Box>
  );
};
