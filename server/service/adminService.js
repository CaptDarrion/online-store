const { User } = require("../models/models");


class AdminService {
    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = new AdminService();