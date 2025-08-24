const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  razorpayPaymentId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: {
    type: String,
    enum: ["created", "paid", "refunded", "failed"],
    default: "created",
  },
  method: { type: String, default: "razorpay" },
  rawResponse: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
