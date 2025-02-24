const ApiError = require("../error/ApiError");
const adminService = require("../service/adminService");

class AdminController {
    async getUsers(req, res, next) {
        try {
          const users = await adminService.getAllUsers();
          return res.json(users)
    
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
    
}

module.exports = new AdminController();