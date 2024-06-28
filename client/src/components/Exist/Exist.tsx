import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./exist.module.css";
import ItemComponent, { Primer } from "./OnePrimer";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
interface AcrylicPrimer {
  id: number;
  priceArea: number;
  priceVolume: number;
  name: string;
  number: number;
  img: string;
}

const AcrylicPrimersList: React.FC = () => {
  // const [primers, setPrimers] = useState<AcrylicPrimer[]>([]);
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

  const [primers, setPrimers] = useState({
    AcrylicPrimer: [],
    Ground: [],
    Lak: [],
    Paint: [],
    Patina: [],
    PrimerInsulator: [],
    Stain: []
  });
 
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/changer")
      .then((response) => {
        setPrimers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // добавила

  const handleDelete = (model, id: number) => {
    axios
      .delete(`http://localhost:3000/changer/${model}/${id}`)
      .then(() => {
        setPrimers({
          ...primers,
          [model]: primers[model].filter((primer) => primer.id !== id)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (model, id, field, value) => {
    axios
      .patch(`http://localhost:3000/changer/${model}/${id}`, { [field]: value })
      .then(() => {
        setPrimers({
          ...primers,
          [model]: primers[model].map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
        });

        if (field === "number") {
          setEditNumber({ ...editNumber, [id]: "" });
        } else if (field === "priceArea") {
          setEditPriceArea({ ...editPriceArea, [id]: "" });
        } else if (field === "priceVolume") {
          setEditPriceVolume({ ...editPriceVolume, [id]: "" });
        }
        console.log('>>>>>>', primers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddNewIngredient = () => {
    axios
      .post("http://localhost:3000/changer", newIngredient)
      .then((response) => {
        setPrimers({
          ...primers,
          [newIngredient.model]: [
            ...primers[newIngredient.model],
            response.data
          ]
        });
        console.log(primers[newIngredient.model]);
        console.log(response.data);
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
    <div className={styles.containerNal}>
      <div className={styles.addNewProd}>
        <h3>Добавить новый ингредиент</h3>
        <select
          value={newIngredient.model}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, model: e.target.value })
          }
        >
          <option value="AcrylicPrimer">Акриловый грунт</option>
          <option value="Ground">Грунт</option>
          <option value="Lak">Лак</option>
          <option value="Paint">Эмаль</option>
          <option value="Patina">Патина</option>
          <option value="PrimerInsulator">Грунт-изолятор</option>
          <option value="Stain">Морилка</option>
        </select>
        <input
          type="text"
          placeholder="Название"
          value={newIngredient.name}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Количество"
          value={newIngredient.number}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, number: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Цена (площадь)"
          value={newIngredient.priceArea}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, priceArea: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Цена (объем)"
          value={newIngredient.priceVolume}
          onChange={(e) =>
            setNewIngredient({
              ...newIngredient,
              priceVolume: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Изображение URL"
          value={newIngredient.img}
          onChange={(e) =>
            setNewIngredient({ ...newIngredient, img: e.target.value })
          }
        />
        {newIngredient.img ? (
          <img src={newIngredient.img || "img"} alt={newIngredient.name} className={styles.primerImage} />
        ) : null}
        <button onClick={handleAddNewIngredient}>Добавить</button>
      </div>
      <div>
      </div>
      <div className={styles.nalichie}>
      <Tabs>
      <TabList>
        <Tab>Акриловый грунт</Tab>
        <Tab>Грунт</Tab>
        <Tab>Лак</Tab>
        <Tab>Эмаль</Tab>
        <Tab>Патина</Tab>
        <Tab>Грунт-изолятор</Tab>
        <Tab>Морилка</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {primers.AcrylicPrimer.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'AcrylicPrimer'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Ground.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Ground'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Lak.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Lak'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Paint.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Paint'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Patina.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Patina'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.PrimerInsulator.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'PrimerInsulator'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Stain.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Stain'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
    </div>
    </div>
  );
};

export default AcrylicPrimersList;



