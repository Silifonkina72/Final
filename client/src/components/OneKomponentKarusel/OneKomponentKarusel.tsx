import { Stain } from "../../types/stainTypes";
import { useAppDispatch } from "../../hooks";
import {  addItemPrice } from "../../store/slices/basketSlice";
import { memo } from 'react';

//! определить нужен ли стейт и типизировать пропсы
// export default function OneComponentKarusel({ el, model }: Stain): JSX.Element {
  
const OneComponentKarusel = memo(({ el, model }): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleAddToBasket = () => {
    dispatch( addItemPrice({ model: model, id: el.id, name: el.name, priceArea: el.priceArea, priceVolume: el.priceVolume, img: el.img }));
  };
  return (
    <div>
      <img src={el.img} alt="Slide" />
      <button onClick={handleAddToBasket} className="legend">
        {el.name}
      </button>
    </div>
  );
})

export default OneComponentKarusel
