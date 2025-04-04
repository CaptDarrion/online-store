const ApiError = require("../error/ApiError");
const BasketService = require("../services/basketService")

class BasketController {
    async addToBasket( req, res, next) {
        try {
            const { productId } = req.body;
            const userId = req.user.id;
            const response = await BasketService.addToBasket(userId, productId)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async removeFromWishlist ( req, res, next) {
        try {
            const {productId } = req.body;
            const userId = req.user.id;
            const response = await BasketService.removeFromBasket(userId, productId)
            return res.json(response);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getWishlist ( req, res, next) {
        try {
            const userId = req.user.id;
            const response = await BasketService.getBasket(userId);
            return res.json(response);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new BasketController();