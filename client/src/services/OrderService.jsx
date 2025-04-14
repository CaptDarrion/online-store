import $api from "../http";

export default class OrderService {
  static async createOrder(orderData, items) {
    return $api.post("/orders/create", { orderData, items });
  }

  static async fetchUserOrders() {
    return $api.get("/orders/");
  }

  static async fetchAllOrders() {
    return $api.get("/orders/all");
  }

  static async fetchOrderById(id) {
    return $api.get("/orders/" + id);
  }

  static async updateOrderStatus(orderId, status) {
    return $api.put(`/orders/${orderId}/status`, { status });
  }

  static async deleteOrder(orderId) {
    return $api.delete("/orders/" + orderId);
  }
}
