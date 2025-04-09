import $api from "../http";

export default class BasketService {
  static async fetchBasket() {
    return $api.get("/basket/");
  }

  static async addToBasket(productId) {
    return $api.post("/basket/", { productId });
  }

  static async removeFromBasket(productId) {
    return $api.delete("/basket/", { data: { productId } });
  }
}
