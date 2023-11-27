// const Answer = require("../models/answer.model");
// const Question = require("../models/questions.model");


// exports.checkAnswer = async(req,res) => {

//     try {
//         const { question, selectedAnswer } = req.body;
    
//         // Assuming question is an object with correct_answer and incorrect_answers
//         const correctAnswer = question.correct_answer;
        
//         const isCorrect = selectedAnswer === correctAnswer;
//         if(isCorrect){
//             res.status(200).json({
//                 success: true,
//                 message: 'Correct Answer',
//                 isCorrect,
//                 data:selectedAnswer
//               });
//         } else {
//             res.status(402).json({
//                 success: true,
//                 message: 'Incorrect Answer',
//                 isCorrect,
//                 data:selectedAnswer
//               });
//         }
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({
//           success: false,
//           message: 'Internal Server Error',
//         });
//       }
// }
const axios = require('axios');

exports.Questions = async (req, res) => {
  const headers = {
    Origin: "https://monetix-lookat1.quiztwiz.com",
  };

  try {
    const id = req.query.quiz;
// console.log('Query Parameters:', req.query);
// console.log('ID:', id);// Log the id for debugging

const response = await axios.get(
  `https://api.quiztwiz.com/api/question/?quiz=${id}`,
  { headers }
);


    const questions = response.data.data;

    if (questions.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Questions Data Fetch Successfully ',
        data: questions,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Questions Data Not Found',
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

