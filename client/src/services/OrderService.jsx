import $api from "../http";

export default class OrderService {
  static async createOrder(orderData, items) {
    return $api.post("/orders/create", { orderData, items });
  }
}
