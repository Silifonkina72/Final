import {
  Text,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeItem } from '../../store/slices/basketSlice';

export const OneProduct = ({ item }): JSX.Element => {
  const dispatch = useAppDispatch();

  const { model, id, name } = item;

  const handleRemoveToBasket = () => {
    dispatch(removeItem({ model: model, id: id }));
  };

  return (
    <div className='card'>
      <p>{name}</p>
      <div className='box'>
        <IconButton aria-label='+' icon={<AddIcon />} />
        <Text>количество</Text>
        <IconButton aria-label='-' icon={<MinusIcon />} />
        <DeleteIcon onClick={handleRemoveToBasket}/>
      </div>
    </div>
  );
};
