const express = require('express');
const acrylicPrimerRouter = express.Router();
const {
  AcrylicPrimer,
  Ground,
  Lak,
  Paint,
  Patina,
  PrimerInsulator,
  Solvent,
  Stain,
} = require('../db/models');

acrylicPrimerRouter.get('/', async (req, res) => {
  try {
    const result = [];
    const primers = await AcrylicPrimer.findAll({ raw: true, nest: true });
    primers.forEach((primer) => {
      if (primer.number < 15) {
        result.push(primer);
      }
    });

    console.log('Primers:', primers);

    const grounds = await Ground.findAll({ raw: true, nest: true });
    grounds.forEach((ground) => {
      if (ground.number < 15) {
        result.push(ground);
      }
    });

    console.log('Grounds:', grounds);

    const laks = await Lak.findAll({ raw: true, nest: true });
    laks.forEach((lak) => {
      if (lak.number < 15) {
        result.push(lak);
      }
    });

    console.log('Laks:', laks);

    const paints = await Paint.findAll({ raw: true, nest: true });
    paints.forEach((paint) => {
      if (paint.number < 15) {
        result.push(paint);
      }
    });

    console.log('Paints:', paints);

    const patinas = await Patina.findAll({ raw: true, nest: true });
    patinas.forEach((patina) => {
      if (patina.number < 15) {
        result.push(patina);
      }
    });

    console.log('Patinas:', patinas);

    const primerInsulators = await PrimerInsulator.findAll({
      raw: true,
      nest: true,
    });
    primerInsulators.forEach((primerInsulator) => {
      if (primerInsulator.number < 15) {
        result.push(primerInsulator);
      }
    });

    console.log('PrimerInsulators:', primerInsulators);

    const solvents = await Solvent.findAll({ raw: true, nest: true });
    solvents.forEach((solvent) => {
      if (solvent.number < 15) {
        result.push(solvent);
      }
    });

    console.log('Solvents:', solvents);

    const stains = await Stain.findAll({ raw: true, nest: true });
    stains.forEach((stain) => {
      if (stain.number < 15) {
        result.push(stain);
      }
    });

    console.log('Stains:', stains);

    const allResult = result.sort((a, b) => a.number - b.number);
    console.log('All Results:', allResult);
    res.json(allResult);
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
  Solvent,
  Stain,
];

// Маршрут для удаления
acrylicPrimerRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    for (const model of models) {
      const result = await model.destroy({ where: { id } });
      if (result) {
        return res.status(204).send();
      }
    }
    res.status(404).send('Not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Маршрут для обновления
acrylicPrimerRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    for (const model of models) {
      const result = await model.update(updates, { where: { id } });
      if (result[0]) {
        return res.status(200).send();
      }
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

