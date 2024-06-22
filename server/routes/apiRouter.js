
const { Router } = require("express");
const stainRouter = require('./stainRouter');
const groundRouter = require('./groundRouter')
const lakRouter = require('./lakRouter')
const primerInsulatorRouter = require('./PrimerInsulatorRouter');
const paintRouter = require("./paintRouter");
const patinaRouter = require("./patinaRouter");
const acrylicPrimerRouter = require("./acrylicPrimerRouter");

const apiRouter = new Router();

module.exports = apiRouter.use('/stain', stainRouter);  
module.exports = apiRouter.use('/ground', groundRouter); 
module.exports = apiRouter.use('/lak', lakRouter); 
module.exports = apiRouter.use('/primerinsulator', primerInsulatorRouter);
module.exports = apiRouter.use('/acrylicprimer', acrylicPrimerRouter);  
module.exports = apiRouter.use('/paint', paintRouter); 
module.exports = apiRouter.use('/patina', patinaRouter); 