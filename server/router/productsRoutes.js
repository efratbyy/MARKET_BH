const express = require("express");
const router = express.Router();
const auth = require("../authProviders/authService");
const {
  getProducts,
  addProduct,
  editProduct,
  getProductByBarcode,
  deleteProduct,
  updateProductInventory,
} = require("../products/productsController");

router.get("/", getProducts);
router.get("/:barcode", getProductByBarcode);
router.post("/add-product", auth, addProduct);
router.patch("/edit-product", auth, editProduct);
router.delete("/delete-product", auth, deleteProduct);
router.patch(
  "/update_inventory/:barcode/:newInventory",
  auth,
  updateProductInventory
);

module.exports = router;
