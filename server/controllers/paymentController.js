const stripe = require("../services/stripeService");
const { uahToUsdCents } = require("../utils/currency");

async function createSession(req, res) {
  const { orderId, amountUAH } = req.body;
  const amountUSD = uahToUsdCents(amountUAH);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Order #${orderId}` },
            unit_amount: amountUSD,
          },
          quantity: 1,
        },
      ],
      metadata: { orderId: String(orderId), amountUAH: String(amountUAH) },
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe create-session error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createSession };
