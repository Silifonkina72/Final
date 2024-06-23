import React, { useEffect, useRef } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';
import './catalog.css';
import ChatBot from '../../components/ChatBot/ChatBot'
import MyMap from '../../components/Catalog/Map';
import { Link } from 'react-router-dom';


const Catalog = () => {
  return (
    <>

     Выбор страницы:<Link to={'/massiv'}><span>массив</span></Link>  и <Link to={'/mdf'}><span>MDF</span></Link>
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
          <div className='chat'>
            Chat
            <ChatBot />
            </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
