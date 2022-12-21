const Joi = require('joi');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const session = require("express-session");

// 'use strict';

/**
 * @author - Ahmed Khan
 *
 * =============================
 * @class - MiddleWare
 * =============================
 *
 * @description - This class acts as a middleware for
 * all APIs.
 *
 * --------------------------
 * Method:
 * @method  {void} apiMiddlewaresConfig
 * @method  {void} secureHeader
 * @method  {void} middlewareSchema
 * @method  {void} paramMiddleware
 * @method  {Static} getInstance
 *
 * --------------------------
 * Exports:
 * @exports instance
 * @exports secureHeader
 * @exports paramMiddleware
 *
 */

class MiddleWare extends ErrorHandler {

  apiMiddlewaresConfig(){
    return [
      {
        name: 'CORS',
        value: cors(),
      },
      {
        name: 'Body Parser',
        value: bodyParser.json({ limit: '50mb' }),
      },
      {
        name: 'Body Parser',
        value: bodyParser.urlencoded({ limit: '50mb', extended: true }),
      },
      {
        name: 'Logger',
        value: logger('dev'),
      },
      {
        name: 'Helmet',
        value: helmet(),
      },
      {
        name: 'Helmet',
        value: helmet({
          frameguard: {
            origin: '103.104.193.62',
            action: 'deny',
          },
        }),
      },
      {
        name: 'Header Security',
        value: this.secureHeader,
      },
      {
        name: 'Session Handler',
        value: session({
          secret: "SECRET",
          resave: true,
          saveUninitialized: true
        })
      }
    ];
  }


  secureHeader(req, res, next) {
    // Remove Headers
    res.removeHeader('Strict-Transport-Security');
    res.removeHeader('X-Content-Type-Options');
    res.removeHeader('X-DNS-Prefetch-Control');
    res.removeHeader('X-Download-Options');
    res.removeHeader('Transfer-Encoding');
    res.removeHeader('X-XSS-Protection');
    res.removeHeader('X-Frame-Options');
    res.removeHeader('X-Powered-By');

    next();
  }


  paramMiddleware(schema, property) {
    return (req, res, next) => {

      /* Fetch propery and schema and validate it using JOI */
      const { error } = Joi.validate(req[property], schema);
      const valid = error == null;
      /*----------------------------*/

      console.log("error:",error)
      /**
         * If valid contains null then validation was successfull
         * else validation failed
         *
         * */
      if (valid) {
        next();
      } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(',');
        res.status(422).json({ error: message });
      }
      /*---------------------------------------*/

    };
  }


  static getInstance() {
    return new MiddleWare();
  }

}


module.exports = {
  instance: MiddleWare.getInstance(),
  secureHeader: MiddleWare.getInstance().secureHeader,
  paramMiddleware: MiddleWare.getInstance().paramMiddleware,
};
