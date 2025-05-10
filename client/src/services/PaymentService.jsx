import $api from "../http";

export default class PaymentService {
  /**
   * Создаёт Stripe Checkout Session и возвращает URL для редиректа
   * @param {number|string} orderId
   * @param {number} amountUAH
   * @returns {Promise<string>}
   */
  static async createStripeSession(orderId, amountUAH) {
    const { data } = await $api.post("/payments/create-session", {
      orderId,
      amountUAH,
    });
    return data.url;
  }
}
