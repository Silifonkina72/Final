import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks';

export const OneProduct = () => {
  const Cart = () => {
    // Извлечение содержимого корзины из Redux store
    // const cartItems = useAppSelector((state) => state.basket.items);

    return (
      <div>
        <h2>Cart</h2>
        {cartItems.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>

          </div>
        ))}
        
      </div>
    );
  };
};
