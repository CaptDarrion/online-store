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
}

module.exports = new AdminController();