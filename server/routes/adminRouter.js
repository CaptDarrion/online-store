const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const adminController = require("../controllers/adminController");

router.get('/users', checkRole('ADMIN'), adminController.getUsers)
router.delete('/user/:email', checkRole('ADMIN'), adminController.deleteUser)

module.exports = router;