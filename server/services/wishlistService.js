const ApiError = require("../error/ApiError");
const { Wishlist, Product, User } = require("../models/models")

class WishlistService {
    async addToWishlist(userId, productId) {
        if (!productId) {
            throw new Error("Product ID is required");
        }
        const wishlist = await Wishlist.create({userId, productId});
        return wishlist;
    }

    async removeFromWishlist(userId, productId) {
        const wishlist = await Wishlist.destroy({where: { userId, productId}});
        return wishlist;
    }

    async getWishlist(userId) {
        try {
            console.log(`Fetching wishlist for userId: ${userId}`);
    
            const user = await User.findByPk(userId, {
                include: {
                    model: Product,
                    through: { attributes: [] } // Исключаем промежуточную таблицу
                }
            });
    
            if (!user) {
                throw new Error("User not found");
            }
    
            console.log('Fetched wishlist:', user.products);
    
            return user.products;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    

}

module.exports = new WishlistService();