const axios = require("axios");
// const Category = require("../models/category.model");
// const Question = require("../models/questions.model");
// const Answer = require("../models/answer.model");
// exports.question = async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://opentdb.com/api.php?amount=2&category=9&difficulty=medium&type=multiple"
//     );
//     const questionsData = response.data.results;
//     if (questionsData) {
//       res.status(200).json({
//         success: true,
//         message: "Data Successfully dfdfd",
//         data: questionsData,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "No Data Found",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json
//     ({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
// exports.multipleQuestion = async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://opentdb.com/api.php?amount=40&type=multiple"
//     );
//     const multiQuestionsData = response.data.results;
//     console.log("*****************", multiQuestionsData);

//     if (multiQuestionsData) {
//       res.status(200).json({
//         success: true,
//         message: "Data Successfully",
//         data: multiQuestionsData,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "No Data Found",
//       }); 
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
// exports.categoryQuestion = async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://opentdb.com/api.php?amount=40&type=multiple"
//     );
//     const multiQuestionsData = response.data.results;

//     const Category = req.params.category;

//     const questionsForCategory = multiQuestionsData.filter(
//       (question) => question.category === Category
//     );
//     if (questionsForCategory.length > 0) {
//       res.status(200).json({
//         success: true,
//         message: "Data Successfully",
//         data: questionsForCategory,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "No Data Found",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
// exports.question = async (req,res) => {
//   const headers = {
//     Origin: "https://monetix-lookat1.quiztwiz.com",
//   }
//   try {
//     const response = await axios.get(
//             "https://api.quiztwiz.com/api/question/?quiz=62f0fd4e029a07c0d987fcab",{headers}
//           );
//         console.log(response.data);
//           // const loginQuestion = response.data
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error"
//     })
//   }
// };
 exports.Categories = async (req,res) => {
  const headers = {
        Origin: "https://monetix-lookat1.quiztwiz.com",
      }
      try {
        const response = await axios.get(
                "https://api.quiztwiz.com/api/question/categories",{headers}
              );
            const category = response.data.data
            if(category) {
              res.status(200).json({
                  success: true,
                  message: 'Data SuccessFully',
                  data:category
              })
            } else {
              res.status(200).json({
                success: false,
                message: 'Data Not Found'
            })
            }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error"
        })
      }
 };
 exports.AllSubCategories = async (req,res) => {
  const headers = {
        Origin: "https://monetix-lookat1.quiztwiz.com",
      }
      try {
        const response = await axios.get(
                "https://api.quiztwiz.com/api/question/quizzes",{headers}
              );
            const category = response.data.data
            if(category) {
              res.status(200).json({
                  success: true,
                  message: 'Data SuccessFully',
                  data:category
              })
            } else {
              res.status(200).json({
                success: false,
                message: 'Data Not Found'
            })
            }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error"
        })
      }
 };
 exports.SubCategories = async (req, res) => {
  const headers = {
    Origin: "https://monetix-lookat1.quiztwiz.com",
  };

  try {
    const id = req.params.id;
    const response = await axios.get(
      `https://api.quiztwiz.com/api/question/quizzes?id=${id}`,
      { headers }
    );

    const category = response.data.data;

    if (category) {
      res.status(200).json({
        success: true,
        message: 'Data Successfully Retrieved',
        data: category,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Data Not Found',
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