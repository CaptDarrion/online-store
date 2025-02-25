const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const adminController = require("../controllers/adminController");
const { body } = require("express-validator");

router.get('/users', checkRole('ADMIN'), adminController.getUsers)
router.delete('/user/:email', checkRole('ADMIN'), adminController.deleteUser)
router.get('/admins/:role', checkRole('ADMIN'), adminController.getAdmins)
router.post('/create-user', 
        checkRole('ADMIN'), 
        body("email").isEmail(),
        body("password").isLength({ min: 3, max: 32}),
        adminController.createUser)

module.exports = router;