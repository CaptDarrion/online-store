const ApiError = require("../error/ApiError");
const { Basket, Product, User } = require("../models/models");

class BasketService {
  async addToBasket(userId, productId, amount = 1) {
    if (!productId) {
      throw ApiError.badRequest("Product ID is required");
    }

    let basket = await Basket.findOne({ where: { userId, productId } });
    if (basket) {
      basket.quantity += amount;
      await basket.save();
    } else {
      basket = await Basket.create({ userId, productId, quantity: amount });
    }

    return basket;
  }

  async removeFromBasket(userId, productId) {
    const basket = await Basket.findOne({ where: { userId, productId } });
    if (!basket) {
      throw ApiError.badRequest("Product is not in basket");
    }

    await Basket.destroy({ where: { userId, productId } });
    return basket;
  }

  async updateBasketItem(userId, productId, newQuantity) {
    if (newQuantity < 1) {
      throw ApiError.badRequest("Quantity must be at least 1");
    }
    const basket = await Basket.findOne({ where: { userId, productId } });
    if (!basket) {
      throw ApiError.badRequest("Product is not in basket");
    }
    basket.quantity = newQuantity;
    await basket.save();
    return basket;
  }

  async getBasket(userId) {
    try {
      const user = await User.findByPk(userId, {
        include: {
          model: Product,
          as: "basketProducts",
          through: { attributes: ["quantity"] },
        },
      });

      if (!user) {
        throw ApiError.badRequest("User not found");
      }

      return user.get("basketProducts") || [];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

module.exports = new BasketService();
