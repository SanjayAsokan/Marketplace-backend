const express = require("express");
const {createProduct, getProducts, getProductById, updateProduct, deleteProduct,} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, authorizeRoles("vendor", "admin"), createProduct);
router.patch("/:id", protect, authorizeRoles("vendor", "admin"), updateProduct);
router.delete("/:id", protect, authorizeRoles("vendor", "admin"), deleteProduct);

module.exports = router;
