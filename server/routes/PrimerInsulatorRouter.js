const { Router } = require("express");
const primerInsulatorRouter = new Router();

const { PrimerInsulator } = require("../db/models");

primerInsulatorRouter.get("/", async (req, res) => {
  const primerInsulators = await PrimerInsulator.findAll();
  res.json(primerInsulators);
});

module.exports = primerInsulatorRouter