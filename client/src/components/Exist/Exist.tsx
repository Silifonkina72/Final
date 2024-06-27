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
    AcrylicPrimers: [],
    Grounds: [],
    Laks: [],
    Paints: [],
    Patinas: [],
    PrimerInsulators: [],
    Stains: []
  });
  console.log(primers);
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/changer")
      .then((response) => {
        setPrimers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            setNewIngredient({
              ...newIngredient,
              priceVolume: e.target.value,
            })
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
      <div>
      </div>
      <div>
      <Tabs>
      <TabList>
        <Tab>AcrylicPrimers</Tab>
        <Tab>Grounds</Tab>
        <Tab>Laks</Tab>
        <Tab>Paints</Tab>
        <Tab>Patinas</Tab>
        <Tab>PrimerInsulators</Tab>
        <Tab>Stains</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {primers.AcrylicPrimers.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'AcrylicPrimers'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Grounds.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Grounds'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Laks.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Laks'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Paints.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Paints'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Patinas.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Patinas'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.PrimerInsulators.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'PrimerInsulators'}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {primers.Stains.map(primer => (
            <ItemComponent
              key={primer.id}
              primer={primer}
              model={'Stains'}
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



