import {
  Text,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeItemSquare, plusItemSquare, minusItemSquare } from '../../store/slices/basketSlice';
import { useEffect } from 'react';

export const OneProductSquare = ({ item, onPriceUpdate }): JSX.Element => {
  const dispatch = useAppDispatch();

  const { model, id, name, square, img, priceArea } = item;

  const handleRemoveToBasket = () => {
    dispatch(removeItemSquare({ model: model, id: id }));
    onPriceUpdate();
  };

  const handleСhangeSquarePlus = () => {
    dispatch(plusItemSquare({ model: model, id: id, square: square }));
    onPriceUpdate();
  };

  const handleСhangeSquareMinus = () => {
    dispatch(minusItemSquare({ model: model, id: id, square: square }));
    onPriceUpdate();
  };

  const price = square*priceArea;

  useEffect(() => {
    onPriceUpdate(price);
  }, [square]);


  return (
    <div className='card'>
      <img src={img} alt='' width="100" height="100"/>
      <p>{name}</p>
      <div className='box'>
        <IconButton aria-label='+' icon={<AddIcon />} onClick={handleСhangeSquarePlus} />
        <Text>{square}</Text>
        <IconButton aria-label='-' icon={<MinusIcon />} onClick={handleСhangeSquareMinus} />
      </div>
        <p>{price}</p>
        <DeleteIcon onClick={handleRemoveToBasket}/>
    </div>
  );
};
