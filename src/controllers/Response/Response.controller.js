const { statusCode } = require('../../utils/constants');
const { logger } = require('../../config/logger');

// 'use strict';
/**
 * @author - Ahmed Khan
 *
 * =============================
 * @class - ResponseController
 * =============================
 *
 * @description - Response controller handles all
 * the responses.
 *
 * --------------------------
 * Method:
 * @method {Void} sendResponse
 * @method {Void} validateResponse
 *
 * --------------------------
 * Exports:
 * @exports Instance
 * @exports ResponseController
 *
 */

class ResponseController {

  constructor(){}

  sendResponse(status, message, data, res){
    res.status(status).json(
      {
        status: status,
        message: message,
        result: (data) || '',
      },
    );
  }

  validateResponse(message, result, res){
    if (result && result.length === 0){
      message = "No record found.";
    }
    this.logResponse(result, 'info', statusCode['SUCCESS']['OK']);
    this.sendResponse(statusCode['SUCCESS']['OK'], message, result, res);
  }

  logResponse(result, level, status){
    logger[level]('API Call', { status, data: result });
  }

  static getInstance() {
    return new ResponseController();
  }

}


/* Export Connect */
module.exports = {
  instance: ResponseController.getInstance(),
  ResponseController,
};
/*--------------*/
