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
import { useAppDispatch } from "../../hooks";
import { createOrderThunk } from "../../store/thunkActions/createOrderThunk";
import { YMaps, withYMaps } from '@pbe/react-yandex-maps';
import Test from "../test";

  export const Delivery = ({ itemsSquare, itemsVolume, totalPrice }) => {
    const [address, setAddress] = useState('');
    const [distance, setDistance] = useState(null);
    const dispatch = useAppDispatch();
  
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };
  
    const handleToCreate = () => {
      dispatch(createOrderThunk({ allPrice: totalPrice, address, itemsSquare, itemsVolume }));
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

    //! 
    const calculateDistance = ({ ymaps, route }) => {
      const [routeLength, setRouteLength] = useState(null);
    
      useEffect(() => {
        let canceled = false;
        
        console.log('1',  ymaps.route);
        console.log('2',  Boolean(ymaps));
    
        if (ymaps && ymaps.route) {
          ymaps.route(route).then((route) => {
            console.log('****', route);
            
            if (!canceled) {
               
              setRouteLength(route.getHumanLength().replace('&#160;', ' '));
            }
          });
        }
    
        return () => {
          canceled = true;
        };
      }, [ymaps, ...route]);
      console.log('roooooooout', routeLength);
      return routeLength;
      // return routeLength ? (
      //   <p>
      //     The route from <strong>{route[0]}</strong> to <strong>{route[1]}</strong> is <strong>{routeLength}</strong> long
      //   </p>
      // ) : (
      //   <p>Loading route...</p>
      // );
    };
    
    const ConnectedLengthPrinter = withYMaps(calculateDistance, true, ['route']);
    
    const Test = () => {
      console.log('>>>>>>>', address);
      
      return (
          <ConnectedLengthPrinter route={['Россия, город Тюмень, улица Мельникайте, дом 10', address]} />
      );
    };
    //!
// export const Delivery = (itemsSquare, itemsVolume, totalPrice) => {
    // const [address, setAddress] = useState('');
  
    // const handleAddressChange = (event) => {
    //     setAddress(event.target.value);
    //   };
  
    // const calculateTotalPrice = () => {
    //   let total = 0;
    //   if (itemsSquare) {
    //     total += itemsSquare.reduce((acc, item) => acc + item.square * item.priceArea, 0);
    //   }
    //   if (itemsVolume) {
    //     total += itemsVolume.reduce((acc, item) => acc + item.count * item.priceVolume, 0);
    //   }
    //   setTotalPrice(total);
    // };
  
    // useEffect(() => {
    //   calculateTotalPrice();
    // }, [itemsSquare, itemsVolume]);
  
    // const handleToCreate = () => {
    //   dispatch(createOrderThunk({allPrice: totalPriceWithDiscount, address: address, itemsSquare, itemsVolume}))
    // }
  
    const discountThreshold = 30000;
    const discountRate = 0.1;
    const isDiscountApplicable = totalPrice > discountThreshold;
    const discountAmount = isDiscountApplicable ? totalPrice * discountRate : 0;
    const totalPriceWithDiscount = totalPrice - discountAmount;
  return (
    <Box p={5} maxWidth='500px' mx='auto'>
      <FormControl mb={5}>
        <FormLabel>Адрес доставки</FormLabel>
        <Input
          value={address}
          placeholder='Введите адрес доставки'
          onChange={handleAddressChange}
        />
        <Button
          colorScheme='blue'
          onClick={handleCalculateShipping}
        >
          Рассчитать стоимость доставки
        </Button>
        <Test/>
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

      <Button colorScheme='teal' onClick={handleToCreate}>
        Оформить заказ
      </Button>
    </Box>
  );
};
