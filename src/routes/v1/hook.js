const express = require('express');

const Router = express.Router();
const ChatbotController = require('../../controllers/Chatbot/Chatbot.controller');


/* -------  WebHook ROUTE -------*/

const routes = {
  hook: '/hook',
};

Router.post(
  routes.hook,
  (req, res) => ChatbotController.generateMessage(req, res),
);

module.exports = Router;
