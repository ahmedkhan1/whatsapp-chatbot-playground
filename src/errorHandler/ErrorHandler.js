// 'use strict';

/**
 * @author - Ahmed Khan
 *
 * =============================
 * @class - ErrorHandler
 * =============================
 *
 * @description - A Generic Error Handler Class.
 *
 * @constructor - statusCode, message
 *
 * @extends - Javascript Error Constructor (Error).
 *
 * --------------------------
 * Method:
 * @method {Void} apiMiddlewaresConfig
 * @method {Void} secureHeader
 *
 * --------------------------
 * Exports:
 * @exports ErrorHandler
 *
 */

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();

    /* Class Instance variables */
    this.statusCode = statusCode;
    this.message = message;
    /*----------------------*/
  }

  handleError(err, res) {
    const { statusCode, message } = err;

    res.status(404).json({
      status: 'error',
      statusCode,
      message,
    });
  }

}

module.exports = {
  ErrorHandler,
};
