
import { Stain } from '../../types/stainTypes';
import { useAppDispatch } from '../../hooks';
import { addItem } from '../../store/slices/basketSlice';


//! определить нужен ли стейт и типизировать пропсы
export default function OneComponentKarusel ({ el, model }: Stain): JSX.Element {
  console.log('model', model);

  const dispatch = useAppDispatch();


  const handleAddToBasket = () => {
   dispatch(addItem({'model': model, 'id': el.id, 'name': el.name}));
  }


  return (

    <div>
          <img
            src={el.img}
            alt="Slide"
          />
          <button onClick={handleAddToBasket} className="legend">{el.name}</button> 
        </div>
  );
}
