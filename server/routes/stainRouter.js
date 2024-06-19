const { Router } = require("express");
const stainRouter = new Router();

const { Stain } = require('../db/models');



stainRouter.get('/', async (req, res) => {
  const stains = await Stain.findAll();
  res.json(stains);
});

module.exports = stainRouter