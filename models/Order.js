const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },},],
    totalAmount: { type: Number, required: true },
    status: {type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending",},
    paymentStatus: { type: String, enum: ["created", "paid", "refunded", "failed"], default: "created",},
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
