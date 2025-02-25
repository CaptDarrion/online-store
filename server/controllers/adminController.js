const ApiError = require("../error/ApiError");
const adminService = require("../service/adminService");
const userService = require("../service/userService");
const { validationResult } = require ("express-validator")


class AdminController {
    async getUsers(req, res, next) {
        try {
          const users = await adminService.getAllUsers();
          return res.json(users)
    
        } catch (e) {
          next(e);
        }
      }
    async getAdmins(req, res, next) {
      try {
          const { role } = req.params;
          const response = await adminService.getAdmins(role)
          return res.json(response)
      } catch (e) {
        next(e);
      }

    }
      async deleteUser(req, res, next) {
        try {
            const { email } = req.params;
            const response = await adminService.deleteUser(email);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async createUser(req, res, next) {
      try {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return next(ApiError.badRequest('Помилка під час валідації', errors.array()));
        }
  
        const { email, password, role } = req.body;
        const userData = await userService.registration(email, password, role);
        return res.json(userData);
      } catch (e) {
        next(e);
      }
    }
}

module.exports = new AdminController();