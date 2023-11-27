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
//  exports.Categories = async (req,res) => {
//   const headers = {
//         Origin: "https://monetix-lookat1.quiztwiz.com",
//       }
//       try {
//         const response = await axios.get(
//                 "https://api.quiztwiz.com/api/question/quizzes?id=categories",{headers}
//               );
//             const category = response.data.data
//             if(category) {
//               res.status(200).json({
//                   success: true,
//                   message: 'Data SuccessFully',
//                   data:category
//               })
//             } else {
//               res.status(200).json({
//                 success: false,
//                 message: 'Data Not Found'
//             })
//             }
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({
//           success: false,
//           message: "Internal Server Error"
//         })
//       }
//  };
// const Question = require("../models/questions.model");
// const Answer = require("../models/answer.model");
// const Category = require("../models/category.model");
// exports.addQuestion = async (req, res) => {
//   try {
//     const { question, answer, A, B, C, D, category } = req.body;
//     const existingQuestion = await Question.findAll({
//       where: {
//         question: question,
//       },
//     });
//     if (existingQuestion.length > 0) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "Question Already Exist",
//       });
//     }
//     const newQuestion = await Question.create({
//       question: question,
//       category: category,
//       answer: answer,
//       A: A,
//       B: B,
//       C: C,
//       D: D,
//     });
//     const newAnswer = await Answer.create({
//       answer: answer,
//       QuestionId: newQuestion.id,
//     });
//     const newCategory = await Category.create({
//       category: category,
//       QuestionId: newQuestion.id,
//     });
//     return res.status(201).json({
//       status: "Success",
//       message: "Question create Successfully",
//       data: newQuestion,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "Fail", error: "Internal Server Error" });
//   }
// };
// exports.listQuestion = async (req, res) => {
//   try {
//     const fetchData = await Question.findAll({
//       include: {
//         model: Answer,
//       },
//     });
//     return res.status(200).json({
//       status: "Success",
//       message: "Question Fetch Successfully",
//       data: fetchData,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "Fail", error: "Internal Server Error" });
//   }
// };
// // exports.serch = async (req, res) => {
// //   try {
// //     const category = req.query;
// //     const selectedCategory = await Question.findAll({
// //       where: {
// //         category: category,
// //       },
// //       include:{
// //         model: Answer
// //       }
// //     });
// //     if (!selectedCategory) {
// //       return res.status(404).json({
// //         status: "Fail",
// //         message: "Category not found",
// //       });
// //     }
// //     return res.status(200).json({
// //       status: "Success",
// //       message: "Questions found by category",
// //       data: selectedCategory,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //     return res
// //       .status(500)
// //       .json({ status: "Fail", error: "Internal Server Error" });
// //   }
// // };
// // Import necessary models and modules
// exports.searchQuestionsByCategory = async (req, res) => {
//   try {
//     const { category } = req.query;
//     // Find the category by name
//     const selectedCategory = await Category.findOne({
//       where: {
//         name: category,
//       },
//     });
//     if (!selectedCategory) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "Category not found",
//       });
//     }
//     // Find questions with the specified category
//     const questions = await Question.findAll({
//       where: {
//         CategoryId: selectedCategory.id,
//       },
//     });
//     return res.status(200).json({
//       status: "Success",
//       message: "Questions found by category",
//       data: questions,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       status: "Fail",
//       error: "Internal Server Error",
//     });
//   }
// };