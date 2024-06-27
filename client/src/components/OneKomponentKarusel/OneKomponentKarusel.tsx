import { Stain } from '../../types/stainTypes';
import { useAppDispatch } from '../../hooks';
import { addItemPrice } from '../../store/slices/basketSlice';
import { memo, useCallback } from 'react';

//! определить нужен ли стейт и типизировать пропсы
interface Props {
  model: string;
  stain: Stain;
}

const OneComponentKarusel = memo(({ stain, model }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleAddToBasket = useCallback(() => {
    const { id, name, priceArea, priceVolume, img, number } = stain;
   
    
    dispatch(
      addItemPrice({ model, id, name, priceArea, priceVolume, img, number })
    );
  }, [stain, model]);

  return (
    <div>
      <img src={stain.img} alt='Slide' />
      <button onClick={handleAddToBasket} className='legend'>
        {stain.name}
      </button>
    </div>
  );
});

export default OneComponentKarusel;
