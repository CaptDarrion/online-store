import { useState, useEffect } from "react";
import OrderService from "../services/OrderService";
import OrderDetailsModal from "./OrderDetailsModal";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [editingStatus, setEditingStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await OrderService.fetchAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Помилка завантаження замовлень:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setEditingStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    const newStatus = editingStatus[orderId];
    try {
      await OrderService.updateOrderStatus(orderId, newStatus);
      setMessage(`Статус замовлення ${orderId} оновлено`);
      fetchOrders();
    } catch (error) {
      console.error("Помилка оновлення статусу:", error);
      setMessage(`Помилка оновлення статусу замовлення ${orderId}`);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await OrderService.deleteOrder(orderId);
      setMessage(`Замовлення ${orderId} видалено`);
      fetchOrders();
    } catch (error) {
      console.error("Помилка видалення замовлення:", error);
      setMessage(`Помилка видалення замовлення ${orderId}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Керування замовленнями</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      {isLoading ? (
        <p>Завантаження замовлень...</p>
      ) : orders.length === 0 ? (
        <p>Немає доступних замовлень.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg transition"
            >
              <div className="mb-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Замовлення #{order.id}
                </h2>
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                <strong>ID користувача:</strong> {order.userId}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Імʼя:</strong> {order.name}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Телефон:</strong> {order.phone}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Адреса:</strong> {order.address}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Оплата:</strong> {order.paymentMethod}
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Змінити статус:
                </label>
                <select
                  value={editingStatus[order.id] || order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="w-full border p-1 rounded"
                >
                  <option value="Чекає на підтвердження">
                    Чекає на підтвердження
                  </option>
                  <option value="Замовлення підтверджено">
                    Замовлення підтверджено
                  </option>
                  <option value="Замовлення укомплектовується">
                    Замовлення укомплектовується
                  </option>
                  <option value="Замовлення передано на доставку">
                    Замовлення передано на доставку
                  </option>
                  <option value="Замовлення доставлено">
                    Замовлення доставлено
                  </option>
                  <option value="Замовлення завершено">
                    Замовлення завершено
                  </option>
                  <option value="Скасовано адміністратором">
                    Скасовано адміністратором
                  </option>
                  <option value="Скасовано користувачем">
                    Скасовано користувачем
                  </option>
                  <option value="Оформлено повернення">
                    Оформлено повернення
                  </option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => handleUpdateStatus(order.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs"
                >
                  Оновити статус
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                >
                  Видалити
                </button>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="underline text-sm text-blue-500 hover:text-blue-700"
                >
                  Детальніше
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default AdminOrderManagement;
