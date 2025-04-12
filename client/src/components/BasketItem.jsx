// src/components/BasketItem.jsx
import { observer } from "mobx-react";
import { useContext } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import { Context } from "../main";

const BasketItem = observer(({ product }) => {
  const { product: productStore } = useContext(Context);
  const qty = product.basket?.quantity ?? 0;

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-md p-3 transition hover:shadow-lg hover:border-green-500">
      {/* Изображение */}
      <img
        src={`http://localhost:5000/${product.img}`}
        alt={product.name}
        className="w-full h-48 object-contain rounded-md mb-2"
      />

      {/* Название */}
      <h3 className="text-sm font-medium text-gray-800 mb-2 truncate">
        {product.name}
      </h3>

      {/* Код товара */}
      <p className="text-xs text-gray-500 mb-1">Код товара: {product.id}</p>

      {/* Цена */}
      <p className="text-gray-600 text-base font-semibold mb-1">
        {product.price} грн
      </p>

      {/* Наличие */}
      <p
        className={`text-sm font-medium mb-2 ${
          product.quantity === 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {product.quantity === 0
          ? "Нет в наличии"
          : `В наличии ${product.quantity}`}
      </p>

      {/* Счётчик количества */}
      <div className="flex items-center justify-center space-x-2 mb-3">
        <button
          onClick={() => productStore.decreaseQuantity(product)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 hover:bg-green-800 text-white transition"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-gray-800">{qty}</span>
        <button
          onClick={() => productStore.increaseQuantity(product)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 hover:bg-green-800 text-white transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Удалить из корзины */}
      <button
        onClick={() => productStore.removeFromBasket(product.id)}
        className="flex items-center justify-center w-full bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-md shadow-sm transition"
      >
        <Trash className="w-5 h-5 mr-2" />
        Удалить из корзины
      </button>
    </div>
  );
});

export default BasketItem;
