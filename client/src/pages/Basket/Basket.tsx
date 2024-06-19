import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addItem } from '../../store/slices/basketSlice';
import { Product } from '../../types/basketTypes';

const Basket = () => {
   const dispatch = useAppDispatch();

//    const [product, setProduct] = useState<Product>({
//     id: 0,
//    })

   const handleAddToBasket = () => {
    dispatch(addItem());
   }



  return (
  <div>
    <button onClick={handleAddToBasket}>
      Add Item
    </button>
  </div>
  )
};

export default Basket;
