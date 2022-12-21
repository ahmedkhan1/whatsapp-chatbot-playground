const BaseController = require('../Base.controller');
const axios = require('axios');

/**
 * @author - Ahmed Khan
 *
 * =============================
 * @class - WhatsAppController
 * =============================
 *
 * @description - WhatsApp controller handles all
 * the user APIs.
 *
 * @extends - BaseController
 *
 * --------------------------
 * Methods:
 * @method {Void} loginAuth
 * @method {Void} sendMessage
 * @method {Void} generateParams
 * @method {Void} generateHeaders
 *
 * --------------------------
 * Exports:
 * @exports - Exports class instance
 *
 */

class WhatsAppController {
  constructor() {
    this.authToken = null;
  }

  async loginAuth() {
    // Login authentication
    try{      
      const params = {
        username: 'admin',
        password: 'Eoceandemo@123',
      };
      console.log("process", process.env.WHATAPP_API)
      const login = await axios.post(`${process.env.WHATAPP_API}/users/login`, {}, { auth: params });
      if(login && login.data.users.length > 0) this.authToken = login.data.users[0].token;
    }catch(err){
      // console.log("Login Error:",err);
    }
  };

  async sendMessage(req, res, msg) {
    if(!this.authToken) await this.loginAuth();

    try{
      const params = JSON.stringify(this.generateParams(req, msg));      
      const headers = this.generateHeaders();
      const msgResponse = await axios.post(`${process.env.WHATAPP_API}/messages`, params, headers);
      if(msgResponse) res.json(msgResponse.data);
    }catch(err){
      // console.log("Send Message error:", err);
    }
  };

  generateParams(req, msg){
    return {
        to: req.body.messages[0].from,
        type: 'text',
        recipient_type: 'individual',
        text: { body: msg },
    };
  }

  generateHeaders(){
    return {
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${this.authToken}`,
        },
    };
  }

}


/* Export Connect */
module.exports = WhatsAppController;
/*--------------*/
