const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/roleMiddleware");
const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getMyOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", protect, restrictTo("admin", "vendor"), getAllOrders);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id", protect, restrictTo("admin", "vendor"), updateOrderStatus);

router.delete("/:id", protect, restrictTo("admin"), deleteOrder);

module.exports = router;
