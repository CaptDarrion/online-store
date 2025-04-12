const ApiError = require("../error/ApiError");
const BasketService = require("../services/basketService");

class BasketController {
  async addToBasket(req, res, next) {
    try {
      const { productId, amount } = req.body;
      const userId = req.user.id;
      const response = await BasketService.addToBasket(
        userId,
        productId,
        amount
      );
      return res.json(response);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeFromBasket(req, res, next) {
    try {
      const { productId, removeAll } = req.body;
      const userId = req.user.id;
      const response = await BasketService.removeFromBasket(
        userId,
        productId,
        removeAll
      );
      return res.json(response);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateBasketItem(req, res, next) {
    try {
      const { productId, newQuantity } = req.body;
      const userId = req.user.id;
      const response = await BasketService.updateBasketItem(
        userId,
        productId,
        newQuantity
      );
      return res.json(response);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getBasket(req, res, next) {
    try {
      const userId = req.user.id;
      const response = await BasketService.getBasket(userId);
      return res.json(response);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
