
require('../utils/dotenv');

/**
 * @author Ahmed Khan
 * ----------------------------------------------------------
 * CONFIGURATIONS
 * ----------------------------------------------------------
 * @description Configuration Exports for All Environments,
 * Database Connectivity, and Logging.
 * ----------------------------------------------------------
 * Exporst:
 * @summary You can load different configurations depending on your
 * current environment. There are three exports.
 *
 * @exports app
 * @exports application_logs
 * @exports auth_secrets
 *
 * The available environments exported for app are:
 *
 * @exports development
 * @exports test
 * @exports production
 *
 * --------------------------
 * Environment Properties:
 * -------------------------
 *
 * @exports  For Application:
 *
 * --------------------------
 * (Development | Testing | Production)
 *
 * @property USERNAME - The username used to connect to the database
 * @property PASSWORD - The password used to connect to the database
 * @property DATABASE - The name of the database you want to connect to
 * @property HOST     - The hostname of your database server.
 * @property DIALECT  - The database dialet. e.g.: mysqli.
 * @property PORT     - The Port for the server and database connectivity
 *
 * --------------------------
 *
 * @exports  For Application Logs:
 *
 * --------------------------
 * @property LOG_PATH
 * @property LOG_LEVEL
 * @property LOG_CONSOLE
 * @property APP_NAME
 *
 * --------------------------
 *
 * @exports  For Auth Secrets:
 *
 * --------------------------
 * @property SECRETS
 * @property ACCESS_EXP_MINS
 * @property REFRESH_EXP_DAYS
 * @property RESET_PASS_EXP_MINS
 *
 * */
module.exports = {

  app: {
    development: {
      USERNAME: process.env.DB_USERNAME,
      PASSWORD: process.env.DB_PASSWORD,
      DATABASE: process.env.DB_NAME,
      HOST:     process.env.DB_HOSTNAME,
      DIALECT:  process.env.DIALECT,
      PORT:     process.env.PORT,
    },
    test: {
      USERNAME: process.env.DB_USERNAME,
      PASSWORD: process.env.DB_PASSWORD,
      DATABASE: process.env.DB_NAME,
      HOST:     process.env.DB_HOSTNAME,
      DIALECT:  process.env.DIALECT,
      PORT:     process.env.PORT,
    },
    production: {
      USERNAME: process.env.DB_USERNAME,
      PASSWORD: process.env.DB_PASSWORD,
      DATABASE: process.env.DB_NAME,
      HOST:     process.env.DB_HOSTNAME,
      DIALECT:  process.env.DIALECT,
      PORT:     process.env.PORT,
    },
  },
  application_logging: {
    LOG_PATH:    process.env.LOG_PATH,
    LOG_LEVEL:   process.env.LOG_LEVEL || 'info',
    LOG_CONSOLE: process.env.LOG_ENABLE_CONSOLE || true,
    APP_NAME:    process.env.LOG_APP_NAME,
  },
  auth_secrets: {
    SECRETS:             process.env.JWT_SECRET,
    ACCESS_EXP_MINS:     process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    REFRESH_EXP_DAYS:    process.env.JWT_REFRESH_EXPIRATION_DAYS,
    RESET_PASS_EXP_MINS: 10,
  },
};
/*------------------*/
