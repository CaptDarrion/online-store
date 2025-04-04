const ApiError = require("../error/ApiError");
const { Basket, Product, User } = require("../models/models")

class BasketService {
    async addToBasket(userId, productId) {
        if (!productId) {
            throw ApiError.badRequest("Product ID is required");
        }
        const basket = await Basket.create({userId, productId});
        return basket;
    }

    async removeFromBasket(userId, productId) {
        const basket = await Basket.destroy({where: { userId, productId}});
        return basket;
    }

    async getBasket(userId) {
        try {
            console.log(`Fetching basket for userId: ${userId}`);
    
            const user = await User.findByPk(userId, {
                include: {
                    model: Product,
                    as: "basketProducts",
                    through: { attributes: [] } 
                }
            });
    
            if (!user) {
                throw ApiError.badRequest("User not found");
            }
    
            console.log('Fetched basket:', user.get('basketProducts'));

    
            return user.get('basketProducts') || [];
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    
    

}

module.exports = new BasketService();