const express = require("express");
const {createProduct, getProducts, getProductById, updateProduct, deleteProduct,} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const { restrictTo  } = require("../middlewares/roleMiddleware");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, restrictTo("vendor", "admin"), upload.array("images", 5), createProduct);

router.patch("/:id", protect, restrictTo ("vendor", "admin"), updateProduct);
router.delete("/:id", protect, restrictTo ("vendor", "admin"), deleteProduct);

module.exports = router;
