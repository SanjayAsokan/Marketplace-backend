const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, currency, category, status, stock } = req.body;

    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const product = await Product.create({
      vendor: req.user._id,
      title,
      description,
      price,
      currency,
      category,
      images: imageUrls,
      status,
      stock,
      isApproved: false, 
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && String(prod.vendor) !== String(req.user._id)) {
      return res.status(403).json({ message: "You can update only your products" });
    }

    const allowed = ["title", "description", "price", "currency", "category", "status", "stock", "isApproved"];
    allowed.forEach((key) => {
      if (key in req.body) prod[key] = req.body[key];
    });

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => file.path);
      prod.images = [...prod.images, ...imageUrls]; 
    }

    await prod.save();
    res.json(prod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category, vendor, status = "active", minPrice, maxPrice, page = 1, limit = 12, sort = "-createdAt" } = req.query;

    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (vendor) query.vendor = vendor;
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    if (search) query.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Product.find(query).sort(sort).skip(skip).limit(Number(limit)).select("-__v"),
      Product.countDocuments(query),
    ]);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
      items,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id).select("-__v");
    if (!prod) return res.status(404).json({ message: "Product not found" });
    res.json(prod);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: "Product not found" });

    if (req.user.role !== "admin" && String(prod.vendor) !== String(req.user._id)) {
      return res.status(403).json({ message: "You can delete only your products" });
    }

    await prod.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
