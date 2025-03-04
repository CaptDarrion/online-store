import $api from "../http";

export default class WishlistService {

    static async fetchWishlist() {
        return $api.get('/wishlist/')
    }

    static async addToWishlist(productId) {
        return $api.post('/wishlist/', { productId })
    }

    static async removeFromWishlist(productId) {
        return $api.delete('/wishlist/', { data: {productId}})
    }

}