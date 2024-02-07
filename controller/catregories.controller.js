const axios = require("axios");
// const fs = require('fs');
// const path = require('path');
// const Category = require('../models/category.model');
const sequelize = require("../config/index");
// // all Category Data
// const CategoryData = async (Categories) => {
//   try {
//     // Loop through the categories and create records in the database
//     for (const categoryData of Categories) {
//       console.log(`Processing category: ${categoryData.category}`);
//       await Category.findOrCreate({
//         where: { category: categoryData.category },
//         defaults: {
//           id: categoryData.id,
//           category: categoryData.category,
//           image: categoryData.image,
//         },
//       });
//     }
//     console.log('Categories stored in the database successfully');
//   } catch (error) {
//     console.error('Error storing categories in the database:', error);
//   }
// };
// exports.Categories = async (req, res) => {
//   try {
//     // Read the JSON file
//     const filePath = path.join(__dirname, 'categories.json');
//     const rawData = fs.readFileSync(filePath);
//     const categoryData = JSON.parse(rawData);

//     await CategoryData(categoryData)

//     res.status(200).json({
//       success: true,
//       message: 'Category Data Fetch Successfully',
//       data: categoryData,
//     });
//     console.log("custom", categoryData);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal Server Error'
//     });
//   }
// };
// exports.SubCategories = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log("id",id);
//     const SubCategory = await Category.findByPk(id);
//     console.log("sub",SubCategory);
//     if (SubCategory) {
//       res.status(200).json({
//         success: true,
//         message: "SubCategory Data Fetch Successfully",
//         data: SubCategory,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "subCategory Data Not Found"
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// }
// const fs = require('fs');
// const path = require('path');
// const { Category, SubCategory } = require('../models/index');
// const sequelize = require("../config/index");

// // Function to store categories and subcategories in the database
// const CategoryData = async (categories) => {
//   try {
//     // Loop through the categories and create records in the database
//     for (const categoryData of categories) {
//       // console.log(`Processing category: ${categoryData.category}`);

//       // Create or update the category
//     const [category,created]= await Category.findOrCreate({
//         where: { category: categoryData.category },
//         defaults: {
//           id: categoryData.id,
//           category: categoryData.category,
//           image: categoryData.image,
//         },
//       });

//       // Create or update subcategories for the category
//       if (categoryData.subcategories && categoryData.subcategories.length > 0) {
//         for (const subcategoryData of categoryData.subcategories) {
//           // console.log(`Processing subcategory: ${subcategoryData.subcategory}`);
//           await SubCategory.findOrCreate({
//             where: { subcategory: subcategoryData.subcategory, CategoryId: category.id },
//             defaults: {
//               id: subcategoryData.id,
//               subcategory: subcategoryData.subcategory,
//               image: subcategoryData.image,
//               CategoryId: category.id,
//             },
//           });
//         }
//       }
//     }
//     // console.log('Categories and subcategories stored in the database successfully');
//   } catch (error) {
//     console.error('Error storing categories and subcategories in the database:', error);
//   }
// };

// exports.Categories = async (req, res) => {
//   try {
//     // Read the JSON file
//     const filePath = path.join(__dirname, 'categories.json');
//     const rawData = fs.readFileSync(filePath);
//     const categoryData = JSON.parse(rawData);

//     // Store categories and subcategories in the database
//     await CategoryData(categoryData);

//     res.status(200).json({
//       success: true,
//       message: 'Category Data Fetch Successfully',
//       data: categoryData,
//     });
//     // console.log("custom", categoryData);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal Server Error'
//     });
//   }
// };

// exports.SubCategories = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log("id",id);
//     const subcategory = await SubCategory.findAll({
//       where: { CategoryId: id },
//       include: Category, // Include the Category model in the query
//     });

//     if (subcategory && subcategory.length > 0) {
//       res.status(200).json({
//         success: true,
//         message: "Subcategories Data Fetch Successfully",
//         data: subcategory,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "Subcategories Data Not Found"
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// };
// exports.AllSubCategories = async (req, res) => {
//   try {
//     // Read the JSON file
//     const filePath = path.join(__dirname, 'categories.json');
//     const rawData = fs.readFileSync(filePath);
//     const categoryData = JSON.parse(rawData);

//     // Extract all subcategories from the categories
//     const allSubcategories = categoryData.reduce((acc, category) => {
//       return acc.concat(category.subcategories);
//     }, []);

//     if (allSubcategories.length > 0) {
//       const subCategoryDetails = await SubCategory.findAll({
//         attributes:['id', 'subcategory', 'image', 'entryFee', 'totalPrice'],
//          include: {
//           model: Category,
//           attributes: ['category'], // Add the attributes you want to include from the Category model
//         },
//       });
//       res.status(200).json({
//         success: true,
//         message: 'All Subcategories Data Fetch Successfully',
//         data: subCategoryDetails,
//       });
//     } else {
//       res.status(200).json({
//         success: false,
//         message: 'No Subcategories Found',
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal Server Error',
//     });
//   }
// };

 exports.Categories = async (req,res) => {
  const headers = {
        Origin: "https://monetix-bhaveshbhai.quiztwiz.com",
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
// All Sub Category Data
exports.AllSubCategories = async (req, res) => {
  const headers = {
    Origin: "https://monetix-bhaveshbhai.quiztwiz.com",
  }
  try {
    const response = await axios.get(
      "https://api.quiztwiz.com/api/question/quizzes", { headers }
    );
    const category = response.data.data
    if (category) {
      res.status(200).json({
        success: true,
        message: 'AllSubCategory Data Fetch Successfully',
        data: category
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
    Origin: "https://monetix-bhaveshbhai.quiztwiz.com",
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