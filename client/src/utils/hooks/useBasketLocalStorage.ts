import { useEffect } from 'react';
import {
  setItemsSquare,
  setItemsVolume,
  setItemPrice,
} from '../../store/slices/basketSlice';
import { Product, Price } from '../../types/basketTypes';
import { useAppDispatch, useAppSelector } from '../../hooks';

const useBasketLocalStorage = () => {
  const dispatch = useAppDispatch();
  const { itemsVolume, itemsSquare, allPrice } = useAppSelector(
    (state) => state.basketSlice
  );

  useEffect(() => {
    const storedItemsVolume = localStorage.getItem('basketItemsVolume');
    if (storedItemsVolume) {
      dispatch(setItemsVolume(JSON.parse(storedItemsVolume) as Product[]));
    }

    const storedItemsSquare = localStorage.getItem('basketItemsSquare');
    if (storedItemsSquare) {
      dispatch(setItemsSquare(JSON.parse(storedItemsSquare) as Product[]));
    }

    const storedItemsPrice = localStorage.getItem('basketItemsPrice');
    if (storedItemsPrice) {
      dispatch(setItemPrice(JSON.parse(storedItemsPrice) as Price[]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basketItemsVolume', JSON.stringify(itemsVolume));
  }, [itemsVolume]);

  useEffect(() => {
    localStorage.setItem('basketItemsSquare', JSON.stringify(itemsSquare));
  }, [itemsSquare]);

  useEffect(() => {
    localStorage.setItem('basketItemsPrice', JSON.stringify(allPrice));
  }, [allPrice]);
};

export default useBasketLocalStorage;
