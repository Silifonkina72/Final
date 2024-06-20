const { Router } = require("express");
const groundRouter = new Router();

const { Ground } = require('../db/models');



groundRouter.get('/', async (req, res) => {
  const grounds = await Ground.findAll();
  res.json(grounds);
});

module.exports = groundRouter