const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products provided" });
        }
        // Calculate total price
        let totalAmount = 0;
        for (let item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            totalAmount += product.price * item.quantity;
        }
        
        const newOrder = new Order({user: req.user.id, products, totalAmount, });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email").populate("products.product", "name price");
        if (!order) 
            return res.status(404).json({ message: "Order not found" });
        
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) 
            return res.status(404).json({ message: "Order not found" });
        order.status = req.body.status || order.status;
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) 
            return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
  }
};
