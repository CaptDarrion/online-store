import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { X } from "lucide-react";
import { Context } from "../main";
import OrderService from "../services/OrderService";
import PaymentService from "../services/PaymentService";

const Checkout = observer(({ onClose }) => {
  const { user, product } = useContext(Context);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    paymentMethod: "card",
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // 1) Создаём заказ в БД, получаем orderId
      const orderResp = await OrderService.createOrder(
        {
          name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone,
          address: form.address,
          paymentMethod: form.paymentMethod,
        },
        items.map((i) => ({ productId: i.id, quantity: i.qty }))
      );
      const orderId = orderResp.data.id;

      if (form.paymentMethod === "card") {
        // 2) В случае оплаты картой редиректим в Stripe
        const checkoutUrl = await PaymentService.createStripeSession(
          orderId,
          totalUAH
        );
        window.location.href = checkoutUrl;
      } else {
        // 3) Иначе — подтверждаем заказ и закрываем окно
        onClose();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
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
          {/* Форма с личными данными */}
          <div className="md:w-1/2 p-6 border-r">
            <h3 className="font-medium text-lg mb-4">Дані для доставки</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Ім&apos;я</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:border-green-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Прізвище</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:border-green-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Телефон</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:border-green-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Адреса</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:border-green-300"
                />
              </div>

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

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
              >
                {submitting
                  ? form.paymentMethod === "card"
                    ? "Переходимо до оплати…"
                    : "Оформлюємо…"
                  : form.paymentMethod === "card"
                  ? `Оплатити ${totalUAH} грн`
                  : "Підтвердити замовлення"}
              </button>
            </form>
          </div>

          {/* Список товаров и итог */}
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
