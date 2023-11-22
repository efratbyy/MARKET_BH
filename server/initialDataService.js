const mongoose = require("mongoose");
const DB_Category = require("./models/mongooseValidation/BigCategory"); // Adjust the path a
const fs = require("fs");

// Recursive way for update any _id filed in any level for match MongoDB _id field (ObjectId)
const convertToObjectId = (data) => {
  const ObjectId = mongoose.Types.ObjectId; // Convert json _id field type to match MongoDB _id field type (ObjectId)
  if (Array.isArray(data)) {
    return data.map((item) => convertToObjectId(item));
  } else if (typeof data === "object" && data !== null) {
    if (data._id && data._id.$oid) {
      data._id = new ObjectId(data._id.$oid);
    }
    Object.keys(data).forEach((key) => {
      data[key] = convertToObjectId(data[key]);
    });
  }
  return data;
};

const InitCategoriesData = async (categoriesJsonFilePath) => {
  const jsonData = fs.readFileSync(categoriesJsonFilePath, "utf-8");

  const categoriesData = JSON.parse(jsonData); // convert txt file to json type object

  // const ObjectId = mongoose.Types.ObjectId; // Convert json _id field type to match MongoDB _id field type (ObjectId)
  // // First level: _id + image
  // const newData = categoriesData.map((bigCategory) => {
  //   if (bigCategory._id && bigCategory._id.$oid) {
  //     bigCategory._id = new ObjectId(bigCategory._id.$oid);
  //     bigCategory.image._id = new ObjectId(bigCategory.image._id.$oid);

  //     // Second level: _id + image
  //     bigCategory.data = bigCategory.data.map((mdCategory) => {
  //       mdCategory._id = new ObjectId(mdCategory._id.$oid);
  //       mdCategory.image._id = new ObjectId(mdCategory.image._id.$oid);

  //       // Third level: _id
  //       mdCategory.data = mdCategory.data.map((smCategory) => {
  //         smCategory._id = new ObjectId(smCategory._id.$oid);
  //         return smCategory;
  //       });
  //       return mdCategory;
  //     });
  //   }
  //   return bigCategory;
  // });

  const newData = convertToObjectId(categoriesData);

  // Inset the categories to DB only if not exist
  const count = await DB_Category.countDocuments({}).exec();

  if (count === 0) {
    // Collection is empty or doesn't exist, you can insert documents
    for (const document of newData) {
      const existingDocument = await DB_Category.findOne({
        code: document.code,
      });

      if (!existingDocument) await DB_Category.create(document);
    }
  } else {
    // Collection is not empty, handle accordingly
    console.log("categories Collection is not empty. Skipping insertion.");
  }
};

exports.InitCategoriesData = InitCategoriesData;
