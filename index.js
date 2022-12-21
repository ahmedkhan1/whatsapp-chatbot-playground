/* eslint-disable no-var */
/* IMPORTS */
const fs = require('fs');
const http = require('http');
const express = require('express');
const { instance } = require('./src/middlewares/Middlewares');
const { PORT } = require('./src/config/config');
const { logger } = require('./src/config/logger');
/*------*/

const app = express();
const port = PORT || 7000;

// To ignore import module issues with esm and axios latest version
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * Setting MiddleWare Configurations
 *
 * @method - apiMiddlewaresConfig
 * @description - Method returns array of middlewares. Middlewares
 * are then set dynamically by passing them in app.use()
 *
 * */
instance.apiMiddlewaresConfig()
  .forEach((element) => {
    app.use(element.value);
  });
/*-------------------------*/


/**
* Initailze Dyanmic Routing
* @description - Adds all routes from routes folder
*
*/
fs.readdir('./src/routes/v1', (err, files) => {
  files.forEach((file) => {
    app.use('/api/v1', require(`./src/routes/v1/${file}`));
  });
});
/*--------------------------------*/


/* Connect to Node Server */
const server = http.createServer(app).listen(port, () => {
  logger.info('Server Status', { status: `Server connected at ${port}` });
});
  /*---------------------*/

module.exports = server;

