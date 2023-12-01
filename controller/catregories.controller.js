const axios = require("axios");
// all Category Data
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
                  message: 'Category Data Fetch Successfully',
                  data:category
              })
            } else {
              res.status(200).json({
                success: false,
                message: 'Category Data Not Found'
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
 //All Sub Category Data
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
                  message: 'AllSubCategory Data Fetch Successfully',
                  data:category
              })
            } else {
              res.status(200).json({
                success: false,
                message: 'AllSubCategory Data Not Found'
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
 // Single Subcategory
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

    if (category.length > 0) {
      res.status(200).json({
        success: true,
        message: 'SubCategory Data Fetch Successfully',
        data: category,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'SubCategory Data Not Found',
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