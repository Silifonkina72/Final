import {
    Text,
    IconButton,
  } from '@chakra-ui/react';
  import { DeleteIcon } from '@chakra-ui/icons'
  import { AddIcon, MinusIcon, ChevronDownIcon } from '@chakra-ui/icons';
  import { useAppDispatch, useAppSelector } from '../../hooks';
  import { minusItemVolume, plusItemVolume, removeItemSquare, removeItemVolume } from '../../store/slices/basketSlice';
import { useEffect } from 'react';
  
  export const OneProductVolum = ({ item, onPriceUpdate }): JSX.Element => {
    const dispatch = useAppDispatch();
  
    const { model, id, name, count, img, priceVolume } = item;
  
    const handleRemoveToBasket = () => {    
      dispatch(removeItemVolume({ model: model, id: id }));
      onPriceUpdate();
    };

    const handleСhangeVolumePlus = () => {
      dispatch(plusItemVolume({ model: model, id: id, count: count }));
      onPriceUpdate();
    };
  
    const handleСhangeVolumeMinus = () => {
      dispatch(minusItemVolume({ model: model, id: id, count: count }));
      onPriceUpdate();
    };

    // const price = count*priceVolume;
    const price = parseFloat((count*priceVolume).toFixed(1));

    useEffect(() => {
      onPriceUpdate();
    }, [count]);

  
    return (
      <div className='card'>
        <img src={img} alt='' width="100" height="100"/>
        <p>{name}</p>
        <div className='box'>
          <IconButton aria-label='+' icon={<AddIcon />} onClick={handleСhangeVolumePlus} />
          <Text>{count}</Text>
          <IconButton aria-label='-' icon={<MinusIcon />} onClick={handleСhangeVolumeMinus} />
        </div>
        <p>{price}</p>
          <DeleteIcon onClick={handleRemoveToBasket}/>
      </div>
    );
  };