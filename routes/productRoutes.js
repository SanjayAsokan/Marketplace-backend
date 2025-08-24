const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { upload } = require("../config/cloudinary");

// Create a product (with multiple images)
router.post("/", protect, upload.array("images", 5), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, upload.array("images", 5), updateProduct); // optional image update
router.delete("/:id", protect, deleteProduct);

module.exports = router;
