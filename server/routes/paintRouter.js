const { Router } = require("express");
const paintRouter = new Router();

const { Paint } = require('../db/models');



paintRouter.get('/', async (req, res) => {
  const paints = await Paint.findAll();
  res.json(paints);
});

module.exports = paintRouter