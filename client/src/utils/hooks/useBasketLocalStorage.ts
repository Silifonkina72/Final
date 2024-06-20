import { useEffect } from 'react';
import { setItems,  setItemPrice} from '../../store/slices/basketSlice';
import { Product, Price } from '../../types/basketTypes';
import { useAppDispatch, useAppSelector } from '../../hooks';

const useBasketLocalStorage = () => {
  const dispatch = useAppDispatch();
  const { items, allPrice } = useAppSelector((state) => state.basketSlice);

  useEffect(() => {

    const storedItems = localStorage.getItem('basketItems');
    if (storedItems) {
      dispatch(setItems(JSON.parse(storedItems) as Product[]));
    }

    const storedItemsPrice = localStorage.getItem('basketItemsPrice');
    if (storedItemsPrice) {
      dispatch( setItemPrice(JSON.parse(storedItemsPrice) as Price[]));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('basketItemsPrice', JSON.stringify(allPrice));
  }, [allPrice]);

};

export default useBasketLocalStorage;
