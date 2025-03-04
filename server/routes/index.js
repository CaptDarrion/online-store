const Router = require("express");
const router = new Router();
const brandRouter = require("./brandRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter")
const wishlistRouter = require("./wishlistRouter")

router.use("/", userRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);
router.use("/admin", adminRouter);
router.use("/wishlist", wishlistRouter);


module.exports = router;
