/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const OrderDetailsModal = ({ order, onClose }) => {
  const navigate = useNavigate();

  console.log(order);

  if (!order) return null;

  const total =
    order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-start pt-16 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold">
            Деталі замовлення #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <span>X</span>
          </button>
        </div>
        <div className="p-6">
          <p className="mb-2">
            <strong>Дата замовлення:</strong>{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : ""}
          </p>
          <p className="mb-2">
            <strong>Статус:</strong> {order.status}
          </p>
          <p className="mb-2">
            <strong>Отримувач:</strong> {order.name}
          </p>
          <p className="mb-2">
            <strong>Адреса доставки:</strong> {order.address}
          </p>
          <p className="mb-2">
            <strong>Спосіб оплати:</strong> {order.paymentMethod}
          </p>
          <p className="mb-2">
            <strong>Статус оплати:</strong> {order.paymentStatus}
          </p>
          <p className="mb-2">
            <strong>Кількість товарів:</strong> {order.items?.length || 0}
          </p>
          <p className="mb-4 text-lg font-bold">
            <strong>Сума:</strong> {total} грн
          </p>
          <h3 className="text-xl font-semibold mb-4">Склад замовлення</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {order.items && order.items.length > 0 ? (
              order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                  onClick={() => navigate(`${PRODUCT_ROUTE}/${item.productId}`)}
                >
                  <img
                    src={`http://localhost:5000/${item.img}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × {item.price} грн
                    </p>
                  </div>
                  <p className="font-semibold">
                    {item.quantity * item.price} грн
                  </p>
                </div>
              ))
            ) : (
              <p>Товари не знайдені.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
