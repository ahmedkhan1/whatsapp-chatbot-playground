/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const Many = require('extends-classes');
const { ResponseController } = require('./Response/Response.controller');

/**
 * @author - Ahmed Khan
 *
 * ==============================
 * @class - BaseController
 * ==============================
 *
 * @description - The Base class which connects
 * (multiple inheritence) multiple classes functionalities.
 *
 * ------------------------------
 * Exports:
 * @extends ResponseController
 *
 * ------------------------------
 * Method:
 * @method {Void} __call
 * ------------------------------
 * Exports:
 * @exports BaseController
 *
 */

class BaseController extends Many(ResponseController) {

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  __call(method) {
    console.log(`'${method}()' is missing!`);
  }
}

module.exports = BaseController;
