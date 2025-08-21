const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
},{ timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
