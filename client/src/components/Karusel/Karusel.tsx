import React from "react";
import "./Karusel.css";
import OneComponentKarusel from "../OneKomponentKarusel/OneKomponentKarusel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // импорт стилей
import { Carousel } from "react-responsive-carousel";
import { ListPropsTypeStain } from '../../types'

function Karusel({stains} :ListPropsTypeStain):JSX.Element {
  
  return (
    <>
      <Carousel width={800} 
      showThumbs={false}
      infiniteLoop={true}
      showStatus={false} 
      >
        {stains.map((stain) => (
          <OneComponentKarusel key={stain.id} stain={stain} />
        ))}
      </Carousel>
    </>
  );
}

export default Karusel;
