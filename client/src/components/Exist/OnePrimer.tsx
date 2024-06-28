import React, { useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import styles from "./exist.module.css";

const ItemComponent = ({ primer, model, onUpdate, onDelete }) => {
  const [editNumber, setEditNumber] = useState(primer.number);
  const [editPriceArea, setEditPriceArea] = useState(primer.priceArea);
  const [editPriceVolume, setEditPriceVolume] = useState(primer.priceVolume);

  return (
    <div key={primer.id} className={styles.primer}>
      <div className={styles.primerName}>
      <div className={styles.primerHeader}>
        <h4>{primer.name}</h4>
        <DeleteIcon onClick={() => onDelete(model, primer.id)}/>
      </div>
      <img src={primer.img || "img"} alt={primer.name} className={styles.primerImage} />
      </div>
      <div className={styles.primerDetails}>
        <div className={styles.primerField}>
          <span>Количество: {primer.number}</span>
          <input
            type="text"
            value={editNumber}
            onChange={(e) => setEditNumber(e.target.value)}
          />
          <button onClick={() => onUpdate(model, primer.id, "number", editNumber)}>
            изменить
          </button>
        </div>
        <div className={styles.primerField}>
          <span>Цена площадь: {primer.priceArea}</span>
          <input
            type="text"
            value={editPriceArea}
            onChange={(e) => setEditPriceArea(e.target.value)}
          />
          <button onClick={() => onUpdate(model, primer.id, "priceArea", editPriceArea)}>
            изменить
          </button>
        </div>
        <div className={styles.primerField}>
          <span>Цена объём: {primer.priceVolume}</span>
          <input
            type="text"
            value={editPriceVolume}
            onChange={(e) => setEditPriceVolume(e.target.value)}
          />
          <button onClick={() => onUpdate(model, primer.id, "priceVolume", editPriceVolume)}>
            изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;