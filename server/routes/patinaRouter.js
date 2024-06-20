const { Router } = require("express");
const patinaRouter = new Router();

const { Patina } = require('../db/models');



patinaRouter.get('/', async (req, res) => {
  const patinas = await Patina.findAll();
  res.json(patinas);
});

module.exports = patinaRouter