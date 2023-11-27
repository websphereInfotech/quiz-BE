const Answer = require("../models/answer.model");
const Question = require("../models/questions.model");


exports.checkAnswer = async(req,res) => {

    try {
        const { question, selectedAnswer } = req.body;
    
        // Assuming question is an object with correct_answer and incorrect_answers
        const correctAnswer = question.correct_answer;
        
        const isCorrect = selectedAnswer === correctAnswer;
        if(isCorrect){
            res.status(200).json({
                success: true,
                message: 'Correct Answer',
                isCorrect,
                data:selectedAnswer
              });
        } else {
            res.status(402).json({
                success: true,
                message: 'Incorrect Answer',
                isCorrect,
                data:selectedAnswer
              });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      }
}
