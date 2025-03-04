const Router = require("express")
const router = new Router();
const wishlistController = require("../controllers/wishlistController")
const authMiddleware = require("../middleware/authMiddleware")
router.get("/", authMiddleware, wishlistController.getWishlist);
router.post("/", authMiddleware, wishlistController.addToWishlist);
router.delete("/", authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;