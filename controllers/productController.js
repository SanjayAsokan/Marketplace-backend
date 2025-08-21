const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, currency, category, images, status, stock } = req.body;
        
        const product = await Product.create({vendor: req.user._id, // owner = logged-in vendor
            title, description, price, currency, category, images, status, stock, });
    res.status(201).json(product);
    }
    catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
    try {
        const {search, category, vendor, status = "active", minPrice, maxPrice, page = 1, limit = 12, sort = "-createdAt", } = req.query;
        
        const q = { };
        if(status)
            q.status = status;
        if(category) 
            q.category = category;
        if(vendor) 
            q.vendor = vendor;
        if(minPrice || maxPrice) {
            q.price = {};
        if(minPrice) 
            q.price.$gte = Number(minPrice);
        if(maxPrice) q.price.$lte = Number(maxPrice);
        }
        if(search){
            q.$text = { $search: search };
        }
        
        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            Product.find(q)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit))
            .select("-__v"),
            Product.countDocuments(q),
        ]);
        
        res.json({ page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)), items,});
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id).select("-__v");
        if (!prod)
             return res.status(404).json({ message: "Product not found" });
        res.json(prod);
    }
    catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

exports.updateProduct = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if (!prod)
            return res.status(404).json({ message: "Product not found" });
        
        if (req.user.role !== "admin" && String(prod.vendor) !== String(req.user._id)) {
            return res.status(403).json({ message: "You can update only your products" });
        }
        
        const allowed = ["title", "description", "price", "currency", "category", "images", "status", "stock"];
        allowed.forEach((k) => {
            if (k in req.body) 
                prod[k] = req.body[k];
            });
        await prod.save();
        res.json(prod);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        
        if (!prod) 
            return res.status(404).json({ message: "Product not found" });
        
        if (req.user.role !== "admin" && String(prod.vendor) !== String(req.user._id)) {
            return res.status(403).json({ message: "You can delete only your products" });
        }
        await prod.deleteOne();
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
