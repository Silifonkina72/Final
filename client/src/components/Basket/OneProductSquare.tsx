import {
  Text,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeItemSquare, removeItemVolume } from '../../store/slices/basketSlice';

export const OneProductSquare = ({ item }): JSX.Element => {
  const dispatch = useAppDispatch();

  const { model, id, name, square } = item;

  const handleRemoveToBasket = () => {
    // console.log('click', model, id);
    
    dispatch(removeItemSquare({ model: model, id: id }));
  };

  return (
    <div className='card'>
      <p>{name}</p>
      <div className='box'>
        <IconButton aria-label='+' icon={<AddIcon />} />
        <Text>{square}</Text>
        <IconButton aria-label='-' icon={<MinusIcon />} />
        <DeleteIcon onClick={handleRemoveToBasket}/>
      </div>
    </div>
  );
};
