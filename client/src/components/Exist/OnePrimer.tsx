import React, { useState } from 'react';
import axios from "axios";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import styles from "./exist.module.css";

const ItemComponent = ({ primer, model, onUpdate, onDelete }) => {
  const [editNumber, setEditNumber] = useState(primer.number);
  const [editPriceArea, setEditPriceArea] = useState(primer.priceArea);
  const [editPriceVolume, setEditPriceVolume] = useState(primer.priceVolume);

  return (
    <div key={primer.id} className={styles.primer}>
      <p>
        {primer.name} : {primer.number}
        <input
          type="text"
          value={editNumber}
          onChange={(e) => setEditNumber(e.target.value)}
        />
        <button
          onClick={() => onUpdate(model, primer.id, "number", editNumber)}
        >
          изменить
        </button>
        <button onClick={() => onDelete(model, primer.id)}>удалить</button>
      </p>
      <p>
        Цена площадь : {primer.priceArea}
        <input
          type="text"
          value={editPriceArea}
          onChange={(e) => setEditPriceArea(e.target.value)}
        />
        <button
          onClick={() => onUpdate(model, primer.id, "priceArea", editPriceArea)}
        >
          изменить цену
        </button>
        {/* <button onClick={() => onDelete(model, primer.id)}>удалить</button> */}
        </p>
        <p>
            Цена объём : {primer.priceVolume}
            <input
          type="text"
          value={editPriceVolume}
          onChange={(e) => setEditPriceVolume(e.target.value)}
        />
            <button
          onClick={() => onUpdate(model, primer.id, "priceVolume", editPriceVolume)}
        >
              изменить цену
            </button>
            {/* <button onClick={() => handleDelete(primer.id)}>удалить</button> */}
          </p>
        </div>
  );
};

export default ItemComponent;