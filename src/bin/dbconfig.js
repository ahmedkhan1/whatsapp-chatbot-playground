/* eslint-disable camelcase */
/* eslint-disable dot-notation */

/* ---- IMPORTS ---- */
const Sequelize = require('sequelize');
const process = require('process');
const { usersModel, transactionsModel, fundsModel, lodgeComplaintModel  } = require('../models');
const { logger } = require('../config/logger');
const { app } = require('../config/config');
const { db_connection } = require('../utils/constants');

const {
  DB_CONNECTION_CLOSE,
  DB_CONNECTION_SUCCESS,
  DB_CONNECTION_FAILED,
  DB_CONNECTION_SYNC_SUCCESS,
} = db_connection;
const {
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
} = app['development'];
/*------------------*/

// 'use strict';


/**
 * @author - Ahmed Khan
 *
 * =============================
 * @class - DbConnect
 * =============================
 *
 * @description - This class handles Database
 * connections.
 *
 * @constructor - Resolve
 *
 * -----------------------------
 * Method:
 * @method  {void} executeConnection
 * @method  {void} authConnection
 * @method  {void} initializeModels
 * @method  {void} createRelations
 * @method  {void} syncConnection
 * @method  {static} getInstance
 *
 * -----------------------------
 * Exports:
 * @exports instance
 *
 */

class DbConnect {

  constructor(resolve){

    /* Instance Varibles */
    this.instance = null;
    this.models = {};
    this.pool = {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    };
    this.resolve = resolve;
    /*------------------*/

    /* Execute Connection on Object initialization */
    this.executeConnection();
    /*--------------------------*/
  }


  executeConnection() {

    /**
     * Sequelize Connection
     *
     * @description - Connect Sequelize to database
     * with database configurations
     *
     * -----------------------
     *
     * @method - Sequelize
     *
     * -----------------------
     * Params:
     * @param {String} DATABASE
     * @param {String} USERNAME
     * @param {String} PASSWORD
     * @param {String} HOST
     * @param {String} DIALECT
     * @param {Number} pool
     *
     */
    const connection = new Sequelize(DATABASE, USERNAME, PASSWORD, {
      host: HOST,
      dialect: DIALECT,
      pool: this.pool,
      logging: false,
    });
    /*-------------------------*/


    /* Authenticate whether the connection was successful or not */
    this.authConnection(connection);
    /*-----------------------------------------*/

  }


  authConnection(connection){
    connection
      .authenticate()
      .then(() => {
        logger.info('Connection Status', { status: DB_CONNECTION_SUCCESS });

        this.instance = 1;

        this.initializeModels(connection);
      })
      .catch((err) => {
        console.log(err);
        // logger.error('Connection Status', { status: DB_CONNECTION_FAILED, Error: err.toString() });
      });
  }


  initializeModels(connection){
    /* All models available */
    this.models = {
      Users: usersModel(connection, Sequelize),
    //   Transaction: transactionsModel(connection, Sequelize),
    //   Funds: fundsModel(connection, Sequelize),
    //   LodgeComplaint: lodgeComplaintModel(connection, Sequelize),
    };

    /* Create Table Relations */
    // this.createRelations(this.models);

    /* Synchronize the connection with Database */
    this.syncConnection(connection);
  }


  createRelations(model) {
    model.Users.belongsTo(model.Transaction, { as: 'employees', foreignKey: 'userId' });
    model.Transaction.hasMany(model.Users, { as: 'absence' });
  }


  syncConnection(connection){
    /**
     *
     * Synchronizing the Database Connection
     *
     * @description - This method synchronizes the connection to database.
     * If the tables are already created and force is set to TRUE, then all
     * tables will be deleted and recreated.
     *
     * @method - sync
     * @param - (force = true | false)
     *
     * */
    connection.sync({ force: true }).then(() => {
      /* Log Succes message */
      logger.info('Synchronization Status', { status: DB_CONNECTION_SYNC_SUCCESS });
      /*------------------*/

      /* Trigger Event on Process Termination */
      this.processTermiationEvent(connection);
      /*-----------------------------------*/

      /* Resolve Promise with Models created for API */
      this.resolve(this.models);
      /*-------------------------*/
    });
  }


  processTermiationEvent(connection){
    process.on('SIGINT', () => {
      connection.close();
      logger.error('DB Connection', { status: DB_CONNECTION_CLOSE });
      process.exit(0);
    });
  }


  static getInstance(resolve) {
    if (!this.instance) {
      this.instance = new DbConnect(resolve);
    }
    return this.instance;
  }

}
/*----------------------*/

/* Asynchronously Export Models */
module.exports = new Promise((resolve) => {
  DbConnect.getInstance(resolve);
});
/*---------------------------*/
