import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./exist.module.css";

interface AcrylicPrimer {
  id: number;
  priceArea: number;
  priceVolume: number;
  name: string;
  number: number;
  img: string;
}

const AcrylicPrimersList: React.FC = () => {
  const [primers, setPrimers] = useState<AcrylicPrimer[]>([]);
  const [editNumber, setEditNumber] = useState<{ [key: number]: string }>({});
  const [editPriceArea, setEditPriceArea] = useState<{ [key: number]: string }>(
    {}
  );
  const [editPriceVolume, setEditPriceVolume] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    axios
      .get<AcrylicPrimer[]>("http://localhost:3000/changer")
      .then((response) => {
        console.log('======>>>>',response.data);
        
        setPrimers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/changer/${id}`)
      .then(() => {
        setPrimers(primers.filter((primer) => primer.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    axios
      .patch(`http://localhost:3000/changer/${id}`, { [field]: value })
      .then(() => {
        setPrimers(
          primers.map((primer) =>
            primer.id === id ? { ...primer, [field]: value } : primer
          )
        );
        if (field === "number") {
          setEditNumber({ ...editNumber, [id]: "" });
        } else if (field === "priceArea") {
          setEditPriceArea({ ...editPriceArea, [id]: "" });
        } else if (field === "priceVolume") {
          setEditPriceVolume({ ...editPriceVolume, [id]: "" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      {primers.map((primer) => (
        <div key={primer.id} className={styles.primer}>
          <p>
            {primer.name} : {primer.number}
            <input
              type="text"
              value={editNumber[primer.id] || ""}
              onChange={(e) =>
                setEditNumber({ ...editNumber, [primer.id]: e.target.value })
              }
            />
            <button
              onClick={() =>
                handleUpdate(primer.id, "number", editNumber[primer.id] || "")
              }
            >
              изменить
            </button>
            <button onClick={() => handleDelete(primer.id)}>удалить</button>
          </p>
          <p>
            Цена площадь : {primer.priceArea}
            <input
              type="text"
              value={editPriceArea[primer.id] || ""}
              onChange={(e) =>
                setEditPriceArea({
                  ...editPriceArea,
                  [primer.id]: e.target.value,
                })
              }
            />
            <button
              onClick={() =>
                handleUpdate(
                  primer.id,
                  "priceArea",
                  editPriceArea[primer.id] || ""
                )
              }
            >
              изменить цену
            </button>
            <button onClick={() => handleDelete(primer.id)}>удалить</button>
          </p>
          <p>
            Цена объём : {primer.priceVolume}
            <input
              type="text"
              value={editPriceVolume[primer.id] || ""}
              onChange={(e) =>
                setEditPriceVolume({
                  ...editPriceVolume,
                  [primer.id]: e.target.value,
                })
              }
            />
            <button
              onClick={() =>
                handleUpdate(
                  primer.id,
                  "priceVolume",
                  editPriceVolume[primer.id] || ""
                )
              }
            >
              изменить цену
            </button>
            <button onClick={() => handleDelete(primer.id)}>удалить</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AcrylicPrimersList;

