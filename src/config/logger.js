/* eslint-disable camelcase */
/* IMPORTS */
const winston = require('winston');

/* Built-in imports */
const os = require('os');
/*----------------*/

const { application_logging } = require('./config');

const {
  APP_NAME,
  LOG_LEVEL,
} = application_logging;

require('../utils/dotenv');
/*----------------*/

const { printf } = winston.format;


// 'use strict';

/**
 * @author - Ahmed Khan
 *
 * =============================
 * @class - Logger
 * =============================
 *
 * @description - This class handles all the logs
 * all APIs.
 *
 * --------------------------
 * Constructor:
 * @constructor {String} name
 * @constructor {Object} options
 *
 * --------------------------
 * Method:
 * @method  {Object} winstonConsoleFormat
 * @method  {void} debug
 * @method  {void} info
 * @method  {void} warn
 * @method  {void} error
 * @method  {void} log
 * @method  {void} logTrace
 *
 * --------------------------
 * Exports:
 * @exports getLogger
 * @exports logger
 *
 */
class Logger {

  constructor(name, options = {}) {

    /* Creating Custom Logger */
    this.name = name;
    this.hostname = os.hostname();

    this.logger = winston.createLogger({
      level: options.logLevel,
      defaultMeta: { service: name },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.metadata({
              fillExcept: ['timestamp', 'service', 'level', 'message'],
            }),
            winston.format.colorize(),
            this.winstonConsoleFormat(),
          ),
        }),
        new winston.transports.File({
          filename: `./logs/${name}.log`,
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.metadata(),
            winston.format.json(),
          ),
        }),
      ],
    });
    /*----------------------*/

    if (options.sensitiveFields) {
      this.sensitiveFields = options.sensitiveFields;
      this.checkSensitiveFields = true;
    }
  }

  winstonConsoleFormat() {
    return printf(({
      timestamp, level, message, metadata,
    }) => {

      /* If metadata exist strigify it else set empty string */
      const metadataString = metadata != null ? JSON.stringify(metadata) : '';
      /*--------------------------------------------------*/

      return `[${timestamp}][${level}][${this.name}@${
        this.hostname
      }][${message}]. ${`METADATA: ${metadataString}`}`;
    });
  }

  /* We expose four levels of logging for this tutorial */

  debug(log, metadata) {
    this.log('debug', log, metadata);
  }

  info(log, metadata) {
    this.log('info', log, metadata);
  }

  warn(log, metadata) {
    this.log('warn', log, metadata);
  }

  error(log, metadata) {
    this.log('error', log, metadata);
  }

  log(level, log, metadata, stackTrace) {

    /* Initialize Store and MetadataObject */
    const metadataObject = {};
    /*-----------------------*/

    if (metadata) metadataObject.metadata = metadata;
    if (stackTrace) metadataObject.stackTrace = stackTrace;

    if (this.checkSensitiveFields) {
      const sensitiveFieldFound = Object.keys(
        metadataObject.metadata || {},
      ).find((key) => this.sensitiveFields.includes(key));
      if (sensitiveFieldFound){
        return this.logTrace(
          'warn',
          `You tried to log the following sensitive key: "${sensitiveFieldFound}". Please check attached stack trace.`,
        );
      }
    }

    if (log instanceof Error) {
      return this.logger[level](log.message, {
        metadata: { stack: log.stack },
      });
    }

    this.logger[level](log, metadataObject.metadata);
  }

  logTrace(level, log, metadata) {
    const stackTrace = new Error().stack;
    this.log(level, log, metadata, stackTrace);
  }
}


/**
 * Exports:
 * @exports getLoggger - Expose a function if we want
 * to use the logger with custom parameters
 *
 * @exports logger - start Logger
 *
 * */
module.exports = {
  getLogger: (name, options) => new Logger(name, options),
  logger: new Logger(APP_NAME, {
    logLevel: LOG_LEVEL,
  }),
};
/*-----------------------------------------*/
