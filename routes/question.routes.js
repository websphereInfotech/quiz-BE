const express = require("express");

const { Questions } = require('../controller/questions.controller');

const QuesationRoutes = express.Router();

QuesationRoutes.get('/questions/:quiz', Questions);

module.exports = QuesationRoutes;