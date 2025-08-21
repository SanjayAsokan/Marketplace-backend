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
        // fetch order from DB
        const order = await Order.findById(orderId);
        if (!order) 
            return res.status(404).json({ message: "Order not found" });
        // create Razorpay order
        const options = {
            amount: order.totalPrice * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt: order._id.toString(),
        };
        const response = await razorpay.orders.create(options);
        const payment = await Payment.create({
            orderId: order._id, razorpayPaymentId: response.id, amount: order.totalPrice, status: "created",
        });
        res.status(200).json({ order, razorpayOrder: response });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.webhook = async (req, res) => {
    const payload = req.body;
    
    // NOTE: In production, verify signature from headers
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = payload.payload.payment.entity;
    try {
        const payment = await Payment.findOne({ razorpayPaymentId: razorpay_order_id });
        if (!payment) 
            return res.status(404).json({ message: "Payment not found" });
        payment.status = "paid";
        payment.rawResponse = payload;
        await payment.save();
        
        // mark order as paid
        await Order.findByIdAndUpdate(payment.orderId, { status: "paid", paymentStatus: "paid" });
        
        res.status(200).json({ message: "Payment verified successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.refundPayment = async (req, res) => {
    try {
        const { paymentId, amount } = req.body; // amount optional for partial refund
        const payment = await Payment.findById(paymentId);
        if (!payment) 
            return res.status(404).json({ message: "Payment not found" });
        const refund = await razorpay.payments.refund(payment.razorpayPaymentId, { amount: amount * 100 });
        
        payment.status = "refunded";
        await payment.save();
        
        // update order as refunded
        await Order.findByIdAndUpdate(payment.orderId, { status: "cancelled", paymentStatus: "refunded" });
        res.status(200).json({ message: "Refund successful", refund });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
