const express = require("express");

const { Questions } = require('../controller/questions.controller');

const QuesationRoutes = express.Router();

QuesationRoutes.get('/questions', Questions);

module.exports = QuesationRoutes;