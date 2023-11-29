const BigCategory = require("../models/mongooseValidation/BigCategory");
const { handleError } = require("../utils/handleErrors");

const getCategories = async (req, res) => {
  try {
    const categoriesFromDB = await BigCategory.find();
    return res.send(categoriesFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getTranslatedCategoryCode = async (req, res) => {
  const { categoryCode } = req.params;

  const smallCategory = await BigCategory.aggregate([
    {
      $unwind: "$data", // שיטוח של האובייקט
    },
    {
      $unwind: "$data.data",
    },
    {
      $match: {
        "data.data.code": { $eq: categoryCode }, // parsms שנשלח ב categoryCode חיפוש משהו שתואם ל
      },
    },
    {
      $project: {
        // שליפה של השדות שבחרנו למטה
        _id: 0,
        title: "$data.data.title",
      },
    },
  ]).exec();

  const mediumCategory = await BigCategory.aggregate([
    {
      $unwind: "$data",
    },
    {
      $match: {
        "data.code": { $eq: categoryCode },
      },
    },
    {
      $project: {
        _id: 0,
        title: "$data.title",
      },
    },
  ]).exec();

  // רק אחת מהקטגוריות יכולה לחזור עם תוכן ולכן מי שיהיה לה תוכן אותו נציג או שנציג ״״
  if (mediumCategory.length > 0) {
    return res.send(mediumCategory[0].title);
  } else if (smallCategory.length > 0) {
    return res.send(smallCategory[0].title);
  } else {
    return res.send("");
  }
};

exports.getCategories = getCategories;
exports.getTranslatedCategoryCode = getTranslatedCategoryCode;
