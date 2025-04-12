import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import BasketItem from "../components/BasketItem";
import Checkout from "./Checkout";
const Basket = observer(() => {
  const { product } = useContext(Context);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    product.loadBasket();
  }, [product]);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/4 lg:max-w-xs">
        <h1 className="text-2xl font-bold mb-4">🛒 Ваша корзина</h1>
        <p className="text-gray-500">
          Вы легко можете перейти к оформлению заказа для покупки данных
          товаров.
        </p>{" "}
        <br />
        {product.basketItems.length > 0 && (
          <button
            onClick={openCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Оформить заказ
          </button>
        )}
      </div>

      <div className="w-full md:w-3/4">
        {product.basketItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {product.basketItems.map((item) => (
              <BasketItem key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Корзина пуста.</p>
        )}
      </div>

      {isCheckoutOpen && <Checkout onClose={closeCheckout} />}
    </div>
  );
});

export default Basket;
