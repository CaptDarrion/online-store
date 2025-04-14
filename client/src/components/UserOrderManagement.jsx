import { useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import OrderDetailsModal from "./OrderDetailsModal";

const UserOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await OrderService.fetchUserOrders();
        setOrders(response.data);
      } catch (e) {
        console.error("Помилка завантаження замовлень:", e);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Історія замовлень</h1>
      {orders.length === 0 ? (
        <p className="text-center">У вас ще немає замовлень.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            return (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-blue-600 flex flex-col"
              >
                <h3 className="font-semibold text-lg mb-2">
                  Замовлення #{order.id}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("uk-UA", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </p>
                <p className="text-sm mb-2">
                  <strong>Статус:</strong> {order.status}
                </p>
                <p className="text-sm mb-2">
                  <strong>Товарів:</strong> {order.items.length}
                </p>
                <p className="text-lg font-bold mb-4">Сума: {total} грн</p>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="mt-auto bg-green-600 hover:bg-green-800 text-white py-2 rounded-lg font-medium transition"
                >
                  Детальніше
                </button>
              </div>
            );
          })}
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

export default UserOrderManagement;
