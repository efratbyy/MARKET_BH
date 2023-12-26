const mongoose = require("mongoose");
const DB_Category = require("../models/mongooseValidation/BigCategory"); // Adjust the path a
const DB_Users = require("../models/mongooseValidation/User");
const DB_Products = require("../models/mongooseValidation/Product");
const fs = require("fs");
const { log } = require("console");

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

const convertToDateObjects = (usersData) => {
  return usersData.map((user) => {
    // Convert date strings to Date objects
    user.createdAt = new Date(user.createdAt["$date"]);
    user.blockedTime = new Date(user.blockedTime["$date"]);
    user.forgotPasswordKeyCreatedTime = new Date(
      user.forgotPasswordKeyCreatedTime["$date"]
    );
    if (user.purchaseHistory && Array.isArray(user.purchaseHistory)) {
      user.purchaseHistory = user.purchaseHistory.map((pHistory) => {
        if (pHistory.orderDate && pHistory.orderDate["$date"]) {
          pHistory.orderDate = new Date(pHistory.orderDate["$date"]);
        }
        return pHistory;
      });
    }
    return user;
  });
};

const InitCategoriesData = async (categoriesJsonFilePath) => {
  const jsonData = fs.readFileSync(categoriesJsonFilePath, "utf-8");

  const categoriesData = JSON.parse(jsonData); // convert txt file to json type object

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
    console.log("categories Collection loaded successfully !");
  } else {
    // Collection is not empty, handle accordingly
    console.log("categories Collection is not empty. Skipping insertion.");
  }
};

const InitUsersData = async (usersJsonFilePath) => {
  const jsonData = fs.readFileSync(usersJsonFilePath, "utf-8");

  const usersData = JSON.parse(jsonData); // convert txt file to json type object

  const newData_date = convertToDateObjects(usersData);
  const newData = convertToObjectId(newData_date);

  const count = await DB_Users.countDocuments({}).exec();

  if (count === 0) {
    // Collection is empty or doesn't exist, you can insert documents
    for (const document of newData) {
      const existingDocument = await DB_Users.findOne({
        email: document.email,
      });

      if (!existingDocument) await DB_Users.create(document);
    }
    console.log("users Collection loaded successfully !");
  } else {
    // Collection is not empty, handle accordingly
    console.log("users Collection is not empty. Skipping insertion.");
  }
};

const InitProductsData = async (productsJsonFilePath) => {
  const jsonData = fs.readFileSync(productsJsonFilePath, "utf-8");

  const productsData = JSON.parse(jsonData); // convert txt file to json type object

  const newData = convertToObjectId(productsData);

  const count = await DB_Products.countDocuments({}).exec();

  if (count === 0) {
    // Collection is empty or doesn't exist, you can insert documents
    for (const document of newData) {
      const existingDocument = await DB_Products.findOne({
        barcode: document.barcode,
      });

      if (!existingDocument) await DB_Products.create(document);
    }
    console.log("Products Collection loaded successfully !");
  } else {
    // Collection is not empty, handle accordingly
    console.log("Products Collection is not empty. Skipping insertion.");
  }
};

exports.InitCategoriesData = InitCategoriesData;
exports.InitUsersData = InitUsersData;
exports.InitProductsData = InitProductsData;
