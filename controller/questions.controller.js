
const axios = require('axios');
// Category Questions 
exports.Questions = async (req, res) => {
  const headers = {
    Origin: "https://monetix-lookat1.quiztwiz.com",
  };

  try {
    const id = req.query.quiz;

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

// Login Page Questions
exports.LoginQuestions = async (req, res) => {
  const headers = {
    Origin: "https://monetix-lookat1.quiztwiz.com",
  };

  try {
    const response = await axios.get(
      'https://api.quiztwiz.com/api/question/?start=true',
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


