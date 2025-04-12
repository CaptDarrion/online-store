const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, basketController.getBasket);
router.post("/", authMiddleware, basketController.addToBasket);
router.put("/", authMiddleware, basketController.updateBasketItem);
router.delete("/", authMiddleware, basketController.removeFromBasket);

module.exports = router;
