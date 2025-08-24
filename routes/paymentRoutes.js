const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createPayment, webhook, refundPayment } = require("../controllers/paymentController");

const router = express.Router();

router.post("/create", protect, createPayment);
router.post("/webhook", webhook);              
router.post("/refund", protect, refundPayment);

module.exports = router;
