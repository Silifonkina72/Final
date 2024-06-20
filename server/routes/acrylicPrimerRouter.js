const { Router } = require("express");
const acrylicPrimerRouter = new Router();

const { AcrylicPrimer } = require('../db/models');



acrylicPrimerRouter.get('/', async (req, res) => {
  const acrylicPrimers = await AcrylicPrimer.findAll();
  res.json(acrylicPrimers);
});

module.exports = acrylicPrimerRouter