const stripe = require("../services/stripeService");
const { uahToUsdCents } = require("../utils/currency");

async function createPaymentIntent(req, res) {
  const { orderId, amountUAH } = req.body;
  const amountUSD = uahToUsdCents(amountUAH);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountUSD,
      currency: "usd",
      metadata: { orderId: String(orderId), amountUAH: String(amountUAH) },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe PaymentIntent error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createPaymentIntent };
