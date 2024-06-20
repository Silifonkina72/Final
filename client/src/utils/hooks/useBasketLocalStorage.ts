import { useEffect } from 'react';
import { setItems } from '../../store/slices/basketSlice';
import { Product } from '../../types/basketTypes';
import { useAppDispatch, useAppSelector } from '../../hooks';

const useBasketLocalStorage = () => {
  const dispatch = useAppDispatch();
  // const { state } = useAppSelector();
  // console.log('state', state);
  
  const { items } = useAppSelector((state) => state.basketSlice);

  useEffect(() => {
    const storedItems = localStorage.getItem('basketItems');
    if (storedItems) {
      dispatch(setItems(JSON.parse(storedItems) as Product[]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(items));
  }, [items]);
};

export default useBasketLocalStorage;
