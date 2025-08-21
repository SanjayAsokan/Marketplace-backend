const Review = require("../models/Review");
const Product = require("../models/Product");
const User = require("../models/User");

exports.createProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { productId } = req.params;
        
        const product = await Product.findById(productId);
        if (!product) 
            return res.status(404).json({ message: "Product not found" });
        
        const review = await Review.create({ product: productId, vendor: product.vendor, user: req.user.id, rating, comment, });
        res.status(201).json({ success: true, review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate("user", "name email").sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createVendorReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { vendorId } = req.params;
        
        const vendor = await User.findById(vendorId);
        if (!vendor) 
            return res.status(404).json({ message: "Vendor not found" });
        const review = await Review.create({vendor: vendorId, user: req.user.id, rating, comment, });
        res.status(201).json({ success: true, review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getVendorReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ vendor: req.params.vendorId }).populate("user", "name email").sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) 
            return res.status(404).json({ message: "Review not found" });
        res.json({ success: true, message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
  }
};
