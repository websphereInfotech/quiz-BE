// const axios = require('axios');
// const sequelize = require('../config/index');
// const fs = require('fs');
// const { json } = require('sequelize');
// const  loginQuestion  = require('../models/loginquestions.model');
// const path = require('path');
// const { promisify } = require('util');
// const readFileAsync = promisify(fs.readFile);
// const Question = require('../models/questions.model');
// const SubCategory = require('../models/subcategory.model');

// exports.LoginQuestions = async (req, res) => {
//   try {
//     // const rootDir = path.resolve(__dirname, '..'); // Move one level up to the root
//     const filePath = path.join(__dirname, 'loginQuestions.json');

//     // console.log('file', filePath);
//     // console.log('Current working directory:', process.cwd());

//     const loginQuestionsBuffer = await readFileAsync(filePath); // Use promisified version
//     const loginQuestionsData = loginQuestionsBuffer.toString('utf-8');
//         // console.log('login', loginQuestionsData);
//     const loginquestion = JSON.parse(loginQuestionsData);

//     await loginQuestion.sync();
//     await loginQuestion.bulkCreate(loginquestion);

//     res.status(200).json({
//       success: true,
//       message: 'Questions Data Fetch Successfully',
//       data: loginquestion,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal Server Error',
//       error: error.message,
//     });
//   }
// };

// // Category Questions
// exports.Questions = async (req, res) => {
//   try {
//     // const id = req.params.id;
//     // console.log("id",id);
//     // const filePath = path.join(__dirname,'questions.json');

//     // const questionBuffer = await readFileAsync(filePath);
//     // const QuestionsData = questionBuffer.toString('utf-8');
//     // const questionsFromJson = JSON.parse(QuestionsData); // Use a different variable name

//     // const Questions = await Question.findAll({
//     //   where: {
//     //     subCategoryId : id,
//     //   }
//     // })
//     const id = req.params.id;
//     console.log("id",id);
//     const Questions = await Question.findAll({
//       where: { subCategoryId: id },
//       include: SubCategory,
//     });
//     console.log("questionsFromJson", Questions);
//     if (Questions.length > 0) {
//       res.status(200).json({
//         success: true,
//         message: 'Questions Data Fetch Successfully ',
//         data: Questions,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: 'Questions Data Not Found',
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

const axios = require("axios");
const { Questions, SubCategory, Category } = require("../models");
const sequelize = require("../config");
// Category Questions
exports.Questions = async (req, res) => {
  // const headers = {
  //   Origin: "https://monetix-bhaveshbhai.quiztwiz.com",
  // };

  try {
    const id = req.query.quiz;

    // const response = await axios.get(
    //   `https://api.quiztwiz.com/api/question/?quiz=${id}`,
    //   { headers }
    // );
    //     const questions = response.data.data;
    const questions = await Questions.findAll({
      where: {
        SubCategoryId: id,
      },
      order: sequelize.literal("RAND()"), // Order by random to get a random set
      limit: 15, // Limit the result to 15 questions
      include: {
        model: SubCategory,
        as: "quiz",
        include: {
          model: Category,
          as: "category",
        },
      },
    });
    if (questions.length) {
      res.status(200).json({
        success: true,
        message: "Questions Data Fetch Successfully ",
        data: questions,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Questions Data Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Login Page Questions
exports.LoginQuestions = async (req, res) => {
  const headers = {
    Origin: "https://monetix-bhaveshbhai.quiztwiz.com",
  };

  try {
    const response = await axios.get(
      "https://api.quiztwiz.com/api/question/?start=true",
      { headers }
    );

    const questions = response.data.data;

    if (questions.length > 0) {
      res.status(200).json({
        success: true,
        message: "Questions Data Fetch Successfully ",
        data: questions,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Questions Data Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
