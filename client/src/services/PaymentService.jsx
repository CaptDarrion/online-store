import $api from "../http";

export default class PaymentService {
  static async createPaymentIntent(orderId, amountUAH) {
    const { data } = await $api.post("/payments/create-payment-intent", {
      orderId,
      amountUAH,
    });
    return data;
  }
}
