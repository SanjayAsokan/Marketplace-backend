const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/roleMiddleware");
const {createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder,} = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, restrictTo("user"), createOrder);

router.get("/", protect, restrictTo("admin", "vendor"), getAllOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id", protect, restrictTo("admin", "vendor"), updateOrderStatus);

router.delete("/:id", protect, restrictTo("admin"), deleteOrder);

module.exports = router;
