import React, { useEffect, useRef } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';
import { MyMap } from '../../components/Catalog/Map';
import './catalog.css';

const Catalog = () => {
  return (
    <>
      <div className='box'>
        <div className='about'>
          Тут будет информация про нас и ссылки на два каталога
        </div>
        <div className='container'>
          <div className='map'>
            Как нас найти
            <YMaps>
              <MyMap />
            </YMaps>
          </div>
          <div className='chat'>Chat</div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
