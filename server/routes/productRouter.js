const Router = require("express");
const router = new Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", productController.create);
router.get("/", productController.getAll);
router.get("/all", productController.getAllWithoutPagination);
router.get("/:id", productController.getOne);
router.delete("/:id", productController.delete);

module.exports = router;
