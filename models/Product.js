const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    vendor:{type: mongoose.Schema.Types.ObjectId, ref: "User", // vendor is a User with role "vendor"
      required: true,},
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" }, 
    category: { type: String, index: true },
    images: [{ type: String }],
    status: { type: String, enum: ["draft", "active", "inactive"], default: "active" },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    stock: { type: Number, default: 0, min: 0 }, 
    isApproved: { type: Boolean, default: false }
  },{ timestamps: true });

productSchema.index({ title: "text", description: "text", category: "text" });

module.exports = mongoose.model("Product", productSchema);
