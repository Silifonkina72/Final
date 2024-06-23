/* eslint-disable max-len */
const express = require('express');

const nalichieRouter = express.Router();
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

nalichieRouter.get('/', async (req, res) => {
  try {
    const result = [];

    const primers = await AcrylicPrimer.findAll({ raw: true, nest: true });
    const grounds = await Ground.findAll({ raw: true, nest: true });
    const laks = await Lak.findAll({ raw: true, nest: true });
    const paints = await Paint.findAll({ raw: true, nest: true });
    const patinas = await Patina.findAll({ raw: true, nest: true });
    const primerInsulators = await PrimerInsulator.findAll({
      raw: true,
      nest: true,
    });
    const solvents = await Solvent.findAll({ raw: true, nest: true });
    const stains = await Stain.findAll({ raw: true, nest: true });
    console.log(grounds);

    result.push(
      ...primers,
      ...grounds,
      ...laks,
      ...paints,
      ...patinas,
      ...primerInsulators,
      ...solvents,
      ...stains,
    );

    // const allResult = result.sort((a, b) => a.number - b.number);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
});

module.exports = nalichieRouter;

// const models = [
//   AcrylicPrimer,
//   Ground,
//   Lak,
//   Paint,
//   Patina,
//   PrimerInsulator,
//   Solvent,
//   Stain,
// ];

// // Маршрут для удаления
// acrylicPrimerRouter.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Попробуем найти и удалить запись в каждой модели
//     for (const model of models) {
//       const result = await model.destroy({ where: { id } });
//       if (result) {
//         return res.status(204).send(); // Если удаление успешно, отправляем 204 No Content
//       }
//     }
//     res.status(404).send('Not found'); // Если запись не найдена в ни одной модели, отправляем 404
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
