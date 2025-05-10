import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import BasketItem from "../components/BasketItem";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";
import { USER_PROFILE_ROUTE } from "../utils/consts";

const Basket = observer(() => {
  const { product } = useContext(Context);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    product.loadBasket();
  }, [product]);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Левая панель */}
      <div className="w-full md:w-1/4 lg:max-w-xs">
        <h1 className="text-2xl font-bold mb-4">🛒 Ваш кошик</h1>
        <p className="text-gray-500 mb-4">
          Ви легко можете перейти до оформлення замовлення для купівлі цих
          товарів
        </p>
        {product.basketItems.length > 0 && (
          <button
            onClick={openCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Оформити замовлення
          </button>
        )}
      </div>
      {/* Товари в корзині */}
      <div className="w-full md:w-3/4">
        {product.basketItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {product.basketItems.map((item) => (
              <BasketItem key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Кошик порожній</p>
        )}
      </div>
      {/* Модалка оформлення */}
      {isCheckoutOpen && (
        <Checkout
          onClose={closeCheckout}
          onSuccess={() => {
            closeCheckout();
            openSuccessModal();
          }}
        />
      )}

      {/* Модальне вікно підтвердження замовлення */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-start pt-16 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-2xl font-semibold text-gray-800">
                Замовлення успішно оформлено!
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Дякуємо за покупку. Наш менеджер зв&apos;яжеться з вами
                найближчим часом. Ви можете перевіряти статус замовлення та
                подробиці у своєму профілі.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => navigate(USER_PROFILE_ROUTE)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Перейти в профіль
                </button>
                <button
                  onClick={closeSuccessModal}
                  className="bg-gray-300 px-4 py-2 rounded text-gray-800 hover:bg-gray-400 transition"
                >
                  Закрити
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Basket;
