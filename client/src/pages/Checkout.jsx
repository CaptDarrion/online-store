import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { X } from "lucide-react";
import { Context } from "../main";
import OrderService from "../services/OrderService";
import PaymentService from "../services/PaymentService";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Checkout = observer(({ onClose, onSuccess }) => {
  const { user, product } = useContext(Context);
  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    paymentMethod: "card",
  });
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user.profile) {
      setForm((f) => ({
        ...f,
        firstName: user.profile.firstName || "",
        lastName: user.profile.lastName || "",
        phone: user.profile.phone || "",
      }));
    }
  }, [user.profile]);

  const items = product.basketItems.map((item) => ({
    id: item.id,
    img: item.img,
    name: item.name,
    price: item.price,
    qty: item.basket.quantity,
  }));
  const totalUAH = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const validateForm = () => {
    const { firstName, lastName, phone, address } = form;
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      setError("Будь ласка, заповніть усі поля");
      return false;
    }
    return true;
  };

  const clearBasket = () => {
    items.forEach((i) => product.removeFromBasket(i.id));
  };

  const handleCardPayment = async () => {
    if (!validateForm()) return;

    setProcessing(true);
    setError(null);
    try {
      const { clientSecret } = await PaymentService.createPaymentIntent(
        items.map((i) => ({ productId: i.id, quantity: i.qty })),
        totalUAH,
        {
          name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone,
          address: form.address,
        }
      );
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });
      if (stripeError) throw stripeError;
      if (paymentIntent.status === "succeeded") {
        await OrderService.createOrder(
          {
            name: `${form.firstName} ${form.lastName}`.trim(),
            phone: form.phone,
            address: form.address,
            paymentMethod: "card",
          },
          items.map((i) => ({ productId: i.id, quantity: i.qty }))
        );

        clearBasket();
        onSuccess();
        onClose();
      }
    } catch (e) {
      setError(e.response?.data?.error || e.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleCashOrder = async () => {
    if (!validateForm()) return;

    setProcessing(true);
    setError(null);
    try {
      await OrderService.createOrder(
        {
          name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone,
          address: form.address,
          paymentMethod: "cash",
        },
        items.map((i) => ({ productId: i.id, quantity: i.qty }))
      );
      clearBasket();
      onSuccess();
      onClose();
    } catch (e) {
      setError(e.response?.data?.error || e.message || "Order failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-start pt-16 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold">Оформлення замовлення</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 border-r">
            <h3 className="font-medium text-lg mb-4">Дані для доставки</h3>
            <form className="space-y-4">
              {["firstName", "lastName", "phone", "address"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 mb-1">
                    {field === "firstName"
                      ? "Ім'я"
                      : field === "lastName"
                      ? "Прізвище"
                      : field === "phone"
                      ? "Телефон"
                      : "Адреса"}
                  </label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:border-green-300"
                  />
                </div>
              ))}
              <div>
                <span className="block text-gray-700 mb-1">Оплата</span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={form.paymentMethod === "card"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Карткою
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={form.paymentMethod === "cash"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Під час отримання
                  </label>
                </div>
              </div>

              {form.paymentMethod === "card" && (
                <div className="border p-4 rounded">
                  <CardElement options={{ hidePostalCode: true }} />
                </div>
              )}

              {error && <p className="text-red-600">{error}</p>}

              {form.paymentMethod === "card" ? (
                <button
                  type="button"
                  onClick={handleCardPayment}
                  disabled={processing || !stripe || !elements}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  {processing ? "Обробка…" : `Оплатити ${totalUAH} грн`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCashOrder}
                  disabled={processing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  {processing ? "Обробка…" : "Підтвердити замовлення"}
                </button>
              )}
            </form>
          </div>
          <div className="md:w-1/2 p-6">
            <h3 className="font-medium text-lg mb-4">Ваше замовлення</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {items.map((i) => (
                <div key={i.id} className="flex items-center space-x-4">
                  <img
                    src={`http://localhost:5000/${i.img}`}
                    alt={i.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 truncate">
                      {i.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {i.qty} × {i.price} грн
                    </p>
                  </div>
                  <p className="font-semibold">{i.qty * i.price} грн</p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <span className="text-lg font-medium">Разом:</span>
              <span className="text-xl font-bold">{totalUAH} грн</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Checkout;
