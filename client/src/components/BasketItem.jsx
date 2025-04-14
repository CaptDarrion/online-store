// src/components/BasketItem.jsx
import { observer } from "mobx-react";
import { useContext } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import { PRODUCT_ROUTE } from "../utils/consts";

const BasketItem = observer(({ product }) => {
  const { product: productStore } = useContext(Context);
  const navigate = useNavigate();

  const qty = product.basket?.quantity ?? 0;
  const stock = product.quantity;
  const cannotIncrease = qty >= stock;

  const handleNavigate = () => {
    navigate(PRODUCT_ROUTE + "/" + product.id);
  };

  const stop = (e) => e.stopPropagation();

  return (
    <div
      onClick={handleNavigate}
      className="relative bg-white border border-gray-200 rounded-lg shadow-md p-3 transition hover:shadow-lg hover:border-green-500 cursor-pointer"
    >
      {/* Зображення */}
      <img
        src={`http://localhost:5000/${product.img}`}
        alt={product.name}
        className="w-full h-48 object-contain rounded-md mb-2"
      />

      {/* Назва */}
      <h3 className="text-sm font-medium text-gray-800 mb-2 truncate">
        {product.name}
      </h3>

      {/* Код */}
      <p className="text-xs text-gray-500 mb-1">Код товару: {product.id}</p>

      {/* Ціна */}
      <p className="text-gray-600 text-base font-semibold mb-1">
        {product.price} грн
      </p>

      {/* Наявність */}
      <p
        className={`text-sm font-medium mb-2 ${
          stock === 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {stock === 0 ? "Немає в наявності" : `В наявності: ${stock}`}
      </p>

      {/* Лічильник */}
      <div className="flex items-center justify-center space-x-2 mb-3">
        <button
          onClick={(e) => {
            stop(e);
            productStore.decreaseQuantity(product);
          }}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 hover:bg-green-800 text-white transition"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="text-sm font-medium text-gray-800">{qty}</span>

        <button
          onClick={(e) => {
            stop(e);
            if (!cannotIncrease) {
              productStore.increaseQuantity(product);
            }
          }}
          disabled={cannotIncrease}
          className={`flex items-center justify-center w-8 h-8 rounded-full text-white transition
            ${
              cannotIncrease
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-800"
            }`}
          title={cannotIncrease ? "Більше немає на складі" : "Додати ще"}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Видалити */}
      <button
        onClick={(e) => {
          stop(e);
          productStore.removeFromBasket(product.id);
        }}
        className="flex items-center justify-center w-full bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-md shadow-sm transition"
      >
        <Trash className="w-5 h-5 mr-2" />
        Видалити з кошика
      </button>
    </div>
  );
});

export default BasketItem;
