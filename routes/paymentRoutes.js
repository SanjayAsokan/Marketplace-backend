const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createPayment,
  verifyPayment,
  refundPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create", protect, createPayment);

router.post("/verify", protect, verifyPayment);

router.post("/refund", protect, refundPayment);

module.exports = router;
