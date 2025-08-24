const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const options = {
      amount: order.totalAmount * 100, // in paise
      currency: "INR",
      receipt: order._id.toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const payment = await Payment.create({
      orderId: order._id,
      razorpayPaymentId: razorpayOrder.id,
      amount: order.totalAmount,
      status: "created",
    });

    order.paymentStatus = "created";
    await order.save();

    res.status(200).json({ order, razorpayOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.webhook = async (req, res) => {
  try {
    const payload = req.body;
    const { razorpay_payment_id, razorpay_order_id } = payload.payload.payment.entity;

    const payment = await Payment.findOne({ razorpayPaymentId: razorpay_order_id });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "paid";
    payment.rawResponse = payload;
    await payment.save();

    await Order.findByIdAndUpdate(payment.orderId, { paymentStatus: "paid", status: "processing" });

    res.status(200).json({ message: "Payment verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refundPayment = async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    const refund = await razorpay.payments.refund(payment.razorpayPaymentId, {
      amount: amount ? amount * 100 : payment.amount * 100
    });

    payment.status = "refunded";
    await payment.save();

    await Order.findByIdAndUpdate(payment.orderId, { status: "cancelled", paymentStatus: "refunded" });

    res.status(200).json({ message: "Refund successful", refund });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
