
const { Router } = require("express");
const stainRouter = require('./stainRouter');

const apiRouter = new Router();

module.exports = apiRouter.use('/stain', stainRouter);  
