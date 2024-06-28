import React, { useEffect, useRef } from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import "./catalog.css";
import ChatBot from "../../components/ChatBot/ChatBot";
import MyMap from "../../components/Catalog/Map";
import { Link } from "react-router-dom";
import MySvgIcon from "../../components/Bot/Bot";
const apiKey = `513313f4-6089-4a80-b442-af1d3277a73e`;

const Catalog = () => {
  return (
    <>
      <div className="box">
        <div className="about">
          Добро пожаловать в <span style={{ fontWeight: 'bold' }}>Paints Market!</span> <br /> Здесь вы найдете
          все необходимые материалы и сможете рассчитать их объем и стоимость.{" "}
          <br />
          Теперь у вас нет необходимости самостоятельно делать сложные расчеты,
          подбирая нужные материалы, Paints Market сделает всю работу за вас!{" "}
          <br />
          Вам необходимо лишь выбрать материал, с которым вы будете работать.
          <Link to={"/massiv"}>
            <span style={{ fontWeight: 'bold' }}> Массив</span>
          </Link>{" "}
          или{" "}
          <Link to={"/mdf"}>
            <span style={{ fontWeight: 'bold' }}>MDF</span>
          </Link>
        </div>

        <div className="containerCatalog">
          <div className="map">
            <span  >
              Здесь вы можете увидеть близлежащие магазины
            </span>

            <YMaps
              query={{
                load: "package.full",
                apikey: apiKey,
              }}
            >
              <MyMap />
            </YMaps>
          </div>
          <div className="chat-container">
          <div className="chat">
            <span className="botText">Вам нужна помощь? Я отвечу на ваши вопросы!</span>
            <div className="circul"></div>
            <div className="circul2"></div>
            <ChatBot />
            {/* <MySvgIcon width="50px" height="50px" /> */}
          </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Catalog;
