import './Karusel.css';
import OneComponentKarusel from '../OneKomponentKarusel/OneKomponentKarusel';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // импорт стилей
import { Carousel } from 'react-responsive-carousel';

import { Stain } from '../../types/stainTypes';
interface Props {
  stains: Stain[];
  model: string;
}

function Karusel({ stains, model }: Props): JSX.Element {
  return (
    <Carousel
      width={400}
      showThumbs={false}
      // infiniteLoop={true}
      showStatus={false}
    >
      {stains.map((stain) => (
        <OneComponentKarusel
          key={stain.id + stain.name}
          stain={stain}
          model={model}
        />
      ))}
    </Carousel>
  );
}

export default Karusel;
