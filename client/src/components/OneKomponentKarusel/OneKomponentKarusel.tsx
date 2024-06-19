
import { Stain } from '../../types/stainTypes';

//! определить нужен ли стейт и типизировать пропсы
export default function OneComponentKarusel ({ stain }: Stain): JSX.Element {
  
  return (
    <div>
          <img
            src={stain.img}
            alt="Slide 1"
          />
          <button className="legend">{stain.name}</button> 
        </div>
  );
}
