const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
const OrderController = require("../controllers/orderController");

router.post("/create", authMiddleware, OrderController.create);
router.get("/all", authMiddleware, OrderController.getUserOrders);
router.get("/:id", authMiddleware, OrderController.getById);
router.put("/:id/status", authMiddleware, OrderController.updateStatus);
router.delete("/:id", checkRole("ADMIN"), OrderController.delete);

module.exports = router;
