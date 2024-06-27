const express = require('express');
const acrylicPrimerRouter = express.Router();
const {
  AcrylicPrimer,
  Ground,
  Lak,
  Paint,
  Patina,
  PrimerInsulator,
  Stain,
} = require('../db/models');

// acrylicPrimerRouter.get('/', async (req, res) => {
//   try {
//     const result = [];
//     const models = [
//       { model: AcrylicPrimer, label: 'AcrylicPrimers' },
//       { model: Ground, label: 'Grounds' },
//       { model: Lak, label: 'Laks' },
//       { model: Paint, label: 'Paints' },
//       { model: Patina, label: 'Patinas' },
//       { model: PrimerInsulator, label: 'PrimerInsulators' },
//       { model: Stain, label: 'Stains' },
//     ];

//     for (const { model, label } of models) {
//       const items = await model.findAll({ raw: true, nest: true });
//       items.forEach((item) => {
//         result.push(item);
//       });
//       console.log(`${label}:`, items);
//     }

//     const allResult = result.sort((a, b) => a.number - b.number);
//     console.log('All Results:', allResult);
//     res.json(allResult);
//   } catch (error) {
//     console.error('Ошибка при получении данных:', error);
//     res.status(500).json({ error: 'Ошибка при получении данных' });
//   }
// });

acrylicPrimerRouter.get('/', async (req, res) => {
  try {
    const result = {
      AcrylicPrimers: [],
      Grounds: [],
      Laks: [],
      Paints: [],
      Patinas: [],
      PrimerInsulators: [],
      Stains: [],
    };

    const models = [
      { model: AcrylicPrimer, label: 'AcrylicPrimers' },
      { model: Ground, label: 'Grounds' },
      { model: Lak, label: 'Laks' },
      { model: Paint, label: 'Paints' },
      { model: Patina, label: 'Patinas' },
      { model: PrimerInsulator, label: 'PrimerInsulators' },
      { model: Stain, label: 'Stains' },
    ];

    for (const { model, label } of models) {
      const items = await model.findAll({ raw: true, nest: true });
      result[label] = items;
      // console.log(`${label}:`, items);
    }

    // console.log('All Results:', result);
    res.json(result);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

const models = [
  AcrylicPrimer,
  Ground,
  Lak,
  Paint,
  Patina,
  PrimerInsulator,
  Stain,
];

// Маршрут для удаления
acrylicPrimerRouter.delete('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  console.log('>>>>>', model, id);
  try {
    let Model;
    switch (model) {
      case 'AcrylicPrimers':
        Model = AcrylicPrimer;
        break;
      case 'Patinas':
        Model = Patina;
        break;
      case 'Grounds':
        Model = Ground;
        break;
      case 'Laks':
        Model = Lak;
        break;
      case 'Paints':
        Model = Paint;
        break;
      case 'Stains':
        Model = Stain;
        break;
      case 'PrimerInsulators':
        Model = PrimerInsulator;
        break;
      default:
        return res.status(400).send('Invalid model');
    }
    const result = await Model.destroy({ where: { id } });
    if (result) {
      return res.status(204).send();
    }
    res.status(404).send('Not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

acrylicPrimerRouter.patch('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  const updates = req.body;
  try {
    let Model;
    switch (model) {
      case 'AcrylicPrimers':
        Model = AcrylicPrimer;
        break;
      case 'Patinas':
        Model = Patina;
        break;
      case 'Grounds':
        Model = Ground;
        break;
      case 'Laks':
        Model = Lak;
        break;
      case 'Paints':
        Model = Paint;
        break;
      case 'Stains':
        Model = Stain;
        break;
      case 'PrimerInsulators':
        Model = PrimerInsulator;
        break;
      default:
        return res.status(400).send('Invalid model');
    }

    const result = await Model.update(updates, { where: { id } });
    if (result[0]) {
      return res.status(200).send();
    }
    res.status(404).send('Not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Маршрут для добавления нового ингредиента
acrylicPrimerRouter.post('/', async (req, res) => {
  const { model, priceArea, priceVolume, name, number, img } = req.body;
  try {
    const Model = models.find((m) => m.name === model);
    if (!Model) {
      return res.status(400).send('Invalid model name');
    }
    const newIngredient = await Model.create({
      priceArea,
      priceVolume,
      name,
      number,
      img,
    });
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = acrylicPrimerRouter;
