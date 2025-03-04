const { User } = require("../models/models");

class AdminService {
    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
    
    async getAdmins(role) {
        const users = await User.findAll({ where: {role: role }})
        return users;
    } 

    async deleteUser(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Пользователь не найден");
        }

        await User.destroy({ where: { email } });
        return { message: "Пользователь успешно удален" }; 
    }
    
}

module.exports = new AdminService();
