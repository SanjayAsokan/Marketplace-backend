const Razorpay = require("razorpay");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const Product = require("../models/Product");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createPayment = async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: "Product not found" });
      totalAmount += product.price * item.quantity;
    }

    const options = {
      amount: Math.round(totalAmount * 100), 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const razorpayOrder = await razorpay.orders.create(options);

    const payment = await Payment.create({
      user: req.user._id,
      products,
      amount: totalAmount,
      currency: "INR",
      razorpayOrderId: razorpayOrder.id,
      status: "created",
    });

    res.status(200).json({ razorpayOrder, paymentId: payment._id });
  } catch (err) {
    console.error("Payment creation failed:", err);
    res.status(500).json({ message: "Payment creation failed", error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "paid";
    payment.razorpayPaymentId = razorpay_payment_id;
    await payment.save();

    const orderProducts = payment.products.map((p) => ({
      product: p.product,
      quantity: p.quantity,
    }));

    const order = await Order.create({
      user: payment.user,
      products: orderProducts,
      totalAmount: payment.amount,
      paymentStatus: "paid",
      status: "processing",
    });

    payment.orderId = order._id;
    await payment.save();

    res.status(200).json({ message: "Payment verified & order created", order });
  } catch (err) {
    console.error("Payment verification failed:", err);
    res.status(500).json({ message: "Payment verification failed", error: err.message });
  }
};

exports.refundPayment = async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    const refund = await razorpay.payments.refund(payment.razorpayPaymentId, {
      amount: amount ? Math.round(amount * 100) : Math.round(payment.amount * 100),
    });

    payment.status = "refunded";
    await payment.save();

    await Order.findByIdAndUpdate(payment.orderId, {
      status: "cancelled",
      paymentStatus: "refunded",
    });

    res.status(200).json({ message: "Refund successful", refund });
  } catch (err) {
    console.error("Refund failed:", err);
    res.status(500).json({ message: "Refund failed", error: err.message });
  }
};
