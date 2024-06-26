import React, { useEffect, useRef } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';
import './catalog.css';
import ChatBot from '../../components/ChatBot/ChatBot'
import MyMap from '../../components/Catalog/Map';
import { Link } from 'react-router-dom';
const apiKey = `513313f4-6089-4a80-b442-af1d3277a73e`;


const Catalog = () => {
  return (
    <>

     
      <div className='box'>
        <div className='about'>
          Мы вам поможем выбрать все необходимые материалы для вашей покраски и расчитать стоимость. Вам необходимо выбрать материал с корорым вы будите работать.
        </div>
        <div><Link to={'/massiv'}><span>Массив</span></Link>  или <Link to={'/mdf'}><span>MDF</span></Link></div>
        <div className='container'>
          <div className='map'>
            Как нас найти
            <YMaps 
            query={{
              load: "package.full",
              apikey: apiKey
            }}>
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
