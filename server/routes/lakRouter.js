const { Router } = require("express");
const lakRouter = new Router();

const { Lak } = require('../db/models');



lakRouter.get('/', async (req, res) => {
  const laks = await Lak.findAll();
  res.json(laks);
});

lakRouter.get('/mdf', async (req, res) => {
  const laks = await Lak.findAll({ where: { onlyMdf: true}});
  res.json(laks);
});

module.exports = lakRouter