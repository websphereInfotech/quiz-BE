const express = require("express");

const { Questions, LoginQuestions } = require('../controller/questions.controller');

const QuesationRoutes = express.Router();

QuesationRoutes.get('/questions', Questions);
QuesationRoutes.get('/loginquestions',LoginQuestions);

module.exports = QuesationRoutes;