import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addItem } from '../../store/slices/basketSlice';
import { Product } from '../../types/basketTypes';
import { OneProduct } from '../../components/Basket/OneProduct';

const Basket = () => {
  const dispatch = useAppDispatch();
    
  const handleAddToBasket = () => {
     dispatch(addItem({id: 3, name: 'product'}));
    }
    
  const items = useAppSelector((state) => state.basketSlice.items);

  return (
    <div>
      {items.map((item) => (
        
        <OneProduct key={item.id} item={item}/>
    // <button onClick={handleAddToBasket}>
    //   Add Item
    // </button>
    ))}
  </div>
  )
};

export default Basket;
