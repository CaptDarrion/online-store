const ApiError = require("../error/ApiError");
const { Wishlist, Product, User } = require("../models/models");

class WishlistService {
  async addToWishlist(userId, productId) {
    if (!productId) {
      throw ApiError.badRequest("Product ID is required");
    }
    const wishlist = await Wishlist.create({ userId, productId });
    return wishlist;
  }

  async removeFromWishlist(userId, productId) {
    const wishlist = await Wishlist.destroy({ where: { userId, productId } });
    return wishlist;
  }

  async getWishlist(userId) {
    try {
      const user = await User.findByPk(userId, {
        include: {
          model: Product,
          as: "wishlistProducts",
          through: { attributes: [] },
        },
      });

      if (!user) {
        throw ApiError.badRequest("User not found");
      }

      return user.get("wishlistProducts") || [];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

module.exports = new WishlistService();
