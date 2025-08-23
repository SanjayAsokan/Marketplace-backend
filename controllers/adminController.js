const User = require("../models/User");
const Product = require("../models/Product");

 // ADMIN CONTROLLER Handles Vendor & Product management by Admin

const adminController = {// Get all vendors
    getAllVendors: async (req, res) => {
        try {
            const vendors = await User.find({ role: "vendor" });
            res.json(vendors);
        } catch (err) {
            res.status(500).json({ message: "Error fetching vendors", error: err.message });
        }
    },
    // Approve vendor
    approveVendor: async (req, res) => {
        try {
            const vendor = await User.findByIdAndUpdate(req.params.vendorId, { isApproved: true }, { new: true });
            if (!vendor) 
                return res.status(404).json({ message: "Vendor not found" });
            res.json({ message: "Vendor approved", vendor });
        } catch (err) {
            res.status(500).json({ message: "Error approving vendor", error: err.message });
        }
    },
    // Reject vendor
    rejectVendor: async (req, res) => {
        try {
            const vendor = await User.findByIdAndUpdate(req.params.vendorId, { isApproved: false },{ new: true });
            if (!vendor) 
                return res.status(404).json({ message: "Vendor not found" });
            res.json({ message: "Vendor rejected", vendor });
        } catch (err) {
            res.status(500).json({ message: "Error rejecting vendor", error: err.message });
        }
    },
    // Delete vendor
    deleteVendor: async (req, res) => {
        try {
            const vendor = await User.findByIdAndDelete(req.params.vendorId);
            if (!vendor) 
                return res.status(404).json({ message: "Vendor not found" });
            res.json({ message: "Vendor deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Error deleting vendor", error: err.message });
        }
    },
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().populate("vendor", "name email");
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: "Error fetching products", error: err.message });
        }
    },
    // Approve product
    approveProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.productId, { isApproved: true }, { new: true });
            if (!product) 
                return res.status(404).json({ message: "Product not found" });
            res.json({ message: "Product approved", product });
        } catch (err) {
            res.status(500).json({ message: "Error approving product", error: err.message });
        }
    },

  // Reject product
    rejectProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.productId, { isApproved: false }, { new: true });
            if (!product) 
                return res.status(404).json({ message: "Product not found" });
            res.json({ message: "Product rejected", product });
        } catch (err) {
            res.status(500).json({ message: "Error rejecting product", error: err.message });
        }
    },
    // Delete product
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.productId);
            if (!product) 
                return res.status(404).json({ message: "Product not found" });
            res.json({ message: "Product deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Error deleting product", error: err.message });
        }
    }
};

module.exports = adminController;
