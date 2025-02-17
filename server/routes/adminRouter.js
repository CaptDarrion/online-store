const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const adminController = require("../controllers/adminController");

router.get('/users', checkRole('ADMIN'), adminController.getUsers)

module.exports = router;