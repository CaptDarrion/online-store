const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", authMiddleware, basketController.getWishlist);
router.post("/", authMiddleware, basketController.addToBasket);
router.delete("/", authMiddleware, basketController.removeFromWishlist);

module.exports = router