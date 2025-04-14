const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
const OrderController = require("../controllers/orderController");

router.post("/create", authMiddleware, OrderController.create);
router.get("/", authMiddleware, OrderController.getUserOrders);
router.get("/all", checkRole("ADMIN"), OrderController.getAllOrders);
router.get("/:id", checkRole("ADMIN"), OrderController.getById);
router.put("/:id/status", checkRole("ADMIN"), OrderController.updateStatus);
router.delete("/:id", checkRole("ADMIN"), OrderController.delete);

module.exports = router;
