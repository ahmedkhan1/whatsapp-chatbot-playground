const BaseController = require('../Base.controller');
const WhatsAppController = require('../WhatsApp/WhatsApp.controller.js');
const botMessages = require('../../utils/botMessages');

/**
 * @author - Ahmed Khan
 *
 * =============================
 * @class - ChatbotController
 * =============================
 *
 * @description - Users controller handles all
 * the user APIs.
 *
 * @extends - BaseController
 *
 * --------------------------
 * Methods:
 * @method {Void} generateMessage
 * @method {Void} getUsersByParams
 *
 * --------------------------
 * Exports:
 * @exports - Exports class instance
 *
 */

class ChatbotController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.whatsapp = new WhatsAppController();
  }

  async generateMessage(req, res) {
    console.log("req.session.stage:", req.session.stage);
    const chatMsg = req.body.messages[0];

    switch(true){
      case req.session.stage === null || req.session.stage === undefined:
        req.session.stage = "main-menu";
        this.initConversion(req, res);
        break;
      case req.session.stage === "main-menu":
        req.session.stage = "sub-main-menu";
        this.conversationMenu(req, res);
        break;
      case req.session.stage === "sub-main-menu":
        this.startConversion(chatMsg.text.body, req, res);
        break;  
      case req.session.stage === "online-orders":
        this.ordersMenu(chatMsg.text.body, req, res);
        break;
      case req.session.stage === "sales-promo":
        this.salesMenu(chatMsg.text.body, req, res);
        break; 
      case req.session.stage === "complaint-queries":
        this.complaintsMenu(chatMsg.text.body, req, res);
        break;
      case chatMsg.text.body === "exit":
        this.complaintsMenu(chatMsg.text.body, req, res);
        break; 
      default:
        break;
    }
  }

  async initConversion(req, res) {
    // init conversation
    const {contacts} = req.body;
    const message = botMessages.onBoardingMsg(contacts[0].profile.name, contacts[0].wa_id);
    this.whatsapp.sendMessage(req, res, message);
  };

  async conversationMenu(req, res) {
    // Conversion Main Menu
    const {contacts} = req.body;
    const message = botMessages.MainMenu(contacts[0].profile.name);
    this.whatsapp.sendMessage(req, res, message);
  }

  async startConversion(text, req, res) {
    // Start conversation
    let message = "";
    if(text === "1"){
      req.session.stage = "online-orders";
      message = botMessages.MainMenuOption1;
    }else if(text === "2"){
      req.session.stage = "sales-promo";
      message = botMessages.MainMenuOption2;
    }else if(text === "3"){
      req.session.stage = "complaint-queries";
      message = botMessages.supportMsg;
    }else{
      req.session.stage = "main-menu";
      message = botMessages.InvalidMainMenuOption;
    }
    this.whatsapp.sendMessage(req, res, message);
  };

  async ordersMenu(text, req, res) {
    let message = "";
    if(text === "1" || text === "2"){
      req.session.stage = "other-info";
      message = botMessages.supportMsg;
    }else if(text === "3"){
      req.session.stage = "main-menu";
      const {contacts} = req.body;
      message = botMessages.MainMenu(contacts[0].profile.name, contacts[0].wa_id);
    }else{
      req.session.stage = "main-menu";
      message = botMessages.InvalidMainMenuOption;
    }
    this.whatsapp.sendMessage(req, res, message);
  };

  async salesMenu(text, req, res) {
    let message = "";
    if(text === "1" || text === "2"){
      req.session.stage = "new-collection";
      message = botMessages.salesLink;
    }else if(text === "3"){
      req.session.stage = "main-menu";
      const {contacts} = req.body;
      message = botMessages.MainMenu(contacts[0].profile.name, contacts[0].wa_id);
    }else{
      req.session.stage = "main-menu";
      message = botMessages.InvalidMainMenuOption;
    }
    this.whatsapp.sendMessage(req, res, message);
  };

  async complaintsMenu(text, req, res) {
    let message = "";
    if(text === "exit"){
      req.session.stage = "main-menu";
      const {contacts} = req.body;
      message = botMessages.MainMenu(contacts[0].profile.name, contacts[0].wa_id);
    }else{
      req.session.stage = "main-menu";
      message = botMessages.InvalidMainMenuOption;
    }
    this.whatsapp.sendMessage(req, res, message);
  };
  
  setBotMessage(botMsg, sessionName) {
    req.session.stage = sessionName;
    message = botMessages[botMsg];
  }

}


/* Export Connect */
module.exports = new ChatbotController();
/*--------------*/
