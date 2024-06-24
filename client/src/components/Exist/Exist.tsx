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
  const [newIngredient, setNewIngredient] = useState({
    model: "AcrylicPrimer",
    priceArea: "",
    priceVolume: "",
    name: "",
    number: "",
    img: "",
  });

  useEffect(() => {
    axios
      .get<AcrylicPrimer[]>("http://localhost:3000/changer")
      .then((response) => {
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

  const handleAddNewIngredient = () => {
    axios
      .post("http://localhost:3000/changer", newIngredient)
      .then((response) => {
        setPrimers([...primers, response.data]);
        setNewIngredient({
          model: "AcrylicPrimer",
          priceArea: "",
          priceVolume: "",
          name: "",
          number: "",
          img: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
       <div className={styles.addNew}>
        <h3>Добавить новый ингредиент</h3>
        <select
          value={newIngredient.model}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, model: e.target.value })
          }
        >
          <option value="AcrylicPrimer">AcrylicPrimer</option>
          <option value="Ground">Ground</option>
          <option value="Lak">Lak</option>
          <option value="Paint">Paint</option>
          <option value="Patina">Patina</option>
          <option value="PrimerInsulator">PrimerInsulator</option>
          <option value="Solvent">Solvent</option>
          <option value="Stain">Stain</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          value={newIngredient.name}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Number"
          value={newIngredient.number}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, number: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price Area"
          value={newIngredient.priceArea}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, priceArea: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price Volume"
          value={newIngredient.priceVolume}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, priceVolume: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newIngredient.img}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, img: e.target.value })
          }
        />
        <button onClick={handleAddNewIngredient}>Добавить</button>
      </div>
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


