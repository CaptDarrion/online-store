import $api from "../http";

export default class BasketService {
  static async fetchBasket() {
    return $api.get("/basket/");
  }

  static async addToBasket(productId, amount = 1) {
    return $api.post("/basket/", { productId, amount });
  }

  static async removeFromBasket(productId) {
    return $api.delete("/basket/", { data: { productId } });
  }

  static async updateBasketItem(productId, newQuantity) {
    return $api.put("/basket/", { productId, newQuantity });
  }
}
