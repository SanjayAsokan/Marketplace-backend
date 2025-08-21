const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/roleMiddleware");
const { createProductReview, getProductReviews, createVendorReview, getVendorReviews, deleteReview,} = require("../controllers/reviewController");

const router = express.Router();

router.post("/product/:productId", protect, createProductReview);
router.get("/product/:productId", getProductReviews);

router.post("/vendor/:vendorId", protect, createVendorReview);
router.get("/vendor/:vendorId", getVendorReviews);

router.delete("/:id", protect, restrictTo("admin"), deleteReview);

module.exports = router;
