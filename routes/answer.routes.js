const express = require("express");

const { checkAnswer } = require('../controller/answer.controller');

const answerRoutes = express.Router();

answerRoutes.post('/check', checkAnswer);

module.exports = answerRoutes;