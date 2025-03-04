const ApiError = require("../error/ApiError");
const WishlistService = require("../services/wishlistService")

class WishlistController {
    async addToWishlist( req, res, next) {
        try {
            const { productId } = req.body;
            const userId = req.user.id;
            const response = await WishlistService.addToWishlist(userId, productId)
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async removeFromWishlist ( req, res, next) {
        try {
            const {productId } = req.body;
            const userId = req.user.id;
            const response = await WishlistService.removeFromWishlist(userId, productId)
            return res.json(response);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getWishlist ( req, res, next) {
        try {
            const userId = req.user.id;
            const response = await WishlistService.getWishlist(userId);
            return res.json(response);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new WishlistController();