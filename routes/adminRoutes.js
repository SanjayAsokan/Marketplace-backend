const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/roleMiddleware");

// Only admin can access 
router.use(protect, restrictTo("admin"));

// Vendor 
router.get("/vendors", adminController.getAllVendors);
router.put("/vendors/:vendorId/approve", adminController.approveVendor);
router.put("/vendors/:vendorId/reject", adminController.rejectVendor);
router.delete("/vendors/:vendorId", adminController.deleteVendor);

// Product 
router.get("/products", adminController.getAllProducts);
router.put("/products/:productId/approve", adminController.approveProduct);
router.put("/products/:productId/reject", adminController.rejectProduct);
router.delete("/products/:productId", adminController.deleteProduct);

module.exports = router;
