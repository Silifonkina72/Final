/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
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

    const grounds = await Ground.findAll({ raw: true, nest: true });
    grounds.forEach((ground) => {
      if (ground.number < 15) {
        result.push(ground);
      }
    });
    const laks = await Lak.findAll({ raw: true, nest: true });
    laks.forEach((lak) => {
      if (lak.number < 15) {
        result.push(lak);
      }
    });
    const paints = await Paint.findAll({ raw: true, nest: true });
    paints.forEach((paint) => {
      if (paint.number < 15) {
        result.push(paint);
      }
    });
    const patinas = await Patina.findAll({ raw: true, nest: true });
    patinas.forEach((patina) => {
      if (patina.number < 15) {
        result.push(patina);
      }
    });
    const primerInsulators = await PrimerInsulator.findAll({
      raw: true,
      nest: true,
    });
    primerInsulators.forEach((primerInsulator) => {
      if (primerInsulator.number < 15) {
        result.push(primerInsulator);
      }
    });
    const solvents = await Solvent.findAll({ raw: true, nest: true });
    solvents.forEach((solvent) => {
      if (solvent.number < 15) {
        result.push(solvent);
      }
    });
    const stains = await Stain.findAll({ raw: true, nest: true });
    stains.forEach((stain) => {
      if (stain.number < 15) {
        result.push(stain);
      }
    });
    const allResult = result.sort((a, b) => a.number - b.number);
    console.log(allResult);
    res.json(allResult);
  } catch (error) {
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
    // Попробуем найти и удалить запись в каждой модели
    for (const model of models) {
      const result = await model.destroy({ where: { id } });
      if (result) {
        return res.status(204).send(); // Если удаление успешно, отправляем 204 No Content
      }
    }
    res.status(404).send('Not found'); // Если запись не найдена в ни одной модели, отправляем 404
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Маршрут для обновления
acrylicPrimerRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    // Попробуем найти и обновить запись в каждой модели
    for (const model of models) {
      const result = await model.update(updates, { where: { id } });
      if (result[0]) {
        // result[0] содержит количество затронутых строк
        return res.status(200).send(); // Если обновление успешно, отправляем 200 OK
      }
    }
    res.status(404).send('Not found'); // Если запись не найдена в ни одной модели, отправляем 404
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = acrylicPrimerRouter;
