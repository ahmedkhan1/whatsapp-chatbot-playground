/* eslint-disable no-unused-vars */
/* eslint-disable key-spacing */
/* eslint-disable quote-props */
/* eslint-disable no-multi-spaces */
import * as fs from 'fs';

/**
 * @author Ahmed Khan
 *
 * =================================
 * | HTTP STATUS CODES
 * =================================
 *
 * @description HTTP verbs used throughtout
 * the project in APIS.
 *
 * ---------------------------------
 * Properties:
 * @property {200} SUCCESS
 * @property {300} CLIENT_ERROR
 * @property {500} SERVER_ERROR
 *
 * */

const statusCode = {
  'SUCCESS': {
    'OK': 200,
    'No_Content': 204,
  },
  'CLIENT_ERROR': {
    'Bad_Request'     : 400,
    'Forbidden'       : 403,
    'Not_Found'       : 404,
    'Request_Timeout' : 408,
  },
  'SERVER_ERROR': {
    'Internal_Server_Error'         : 500,
    'Network_Connect_Timeout_Error' : 599,
  },
};
/* ================================== */



/**
 * =================================
 * | CONSTANT STRINGS
 * =================================
 *
 * @description Constant variables used throughtout
 * the project.
 *
 * ---------------------------------
 * Constant:
 * @constant INT_VALID_MESSAGE
 * @constant STR_VALID_MESSAGE
 *
 * */

const INT_VALID_MESSAGE = 'Must be an integer number';
const STR_VALID_MESSAGE = 'Must be a string';
const STR_PATTERN       = /^[A-Za-z ]+$/i;
const ADDRESS_PATTERN   = /^[^\s-][a-zA-Z0-9 #@,-?.()]{2,30}[^\s-]$/i;
const NUMBER_PATTERN       = /^[0-9 ]+$/i;

const DB_CONNECTION_CLOSE        = 'Database Connection closed due to NodeJs process termination';
const DB_CONNECTION_SUCCESS      = 'Connection has been established successfully';
const DB_CONNECTION_FAILED       = 'Unable to connect to the database:';
const DB_CONNECTION_SYNC_SUCCESS = 'Synchronization Successful';


const DATA_INSERTION_FAILED   = 'Database Connection closed due to NodeJs process termination';
const DATA_INSERTION_SUCCESS  = 'Connection has been established successfully';


/* ================================= */




/**
 * =================================
 * | METHODS
 * =================================
 *
 * @description Constant methods used
 * throughtout the project.
 * ---------------------------------
 * Method:
 * @method {Promise} readJsonFile - This method reads JSON Files
 * throught promise.
 *
 * */

const readJsonFile = (path) => new Promise((resolve) => fs.readFile(path, 'utf8', (_, data) => resolve(data)));

/*--------------------------------*/





/* Exporting All Constants */
module.exports = {
  statusCode,
  INT_VALID_MESSAGE,
  STR_VALID_MESSAGE,
  STR_PATTERN,
  NUMBER_PATTERN,
  ADDRESS_PATTERN,
  readJsonFile,

  db_connection: {
    DB_CONNECTION_CLOSE,
    DB_CONNECTION_SUCCESS,
    DB_CONNECTION_FAILED,
    DB_CONNECTION_SYNC_SUCCESS,
  },
};
/*----------------------*/
