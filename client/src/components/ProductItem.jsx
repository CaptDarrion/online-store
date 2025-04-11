import { observer } from "mobx-react";
import { useContext } from "react";
import { Star, ShoppingCart, Heart, HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = observer(({ product }) => {
  const navigate = useNavigate();
  const { product: productStore } = useContext(Context);

  const isInBasket = productStore.isItemInBasket(product.id);
  const isInWishlist = productStore.hasInWishlist(product.id);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      productStore.removeFromWishlist(product.id);
    } else {
      productStore.addToWishlist(product);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (isInBasket) {
      productStore.removeFromBasket(product.id);
    } else {
      productStore.addToBasket(product);
    }
  };

  return (
    <div
      className="relative bg-white border border-gray-200 rounded-lg shadow-md p-3 transition hover:shadow-lg hover:border-green-500"
      onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
    >
      <img
        src={`http://localhost:5000/${product.img}`}
        alt={product.name}
        className="w-full h-48 object-contain rounded-md mb-2"
      />

      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          className="bg-white p-2 rounded-full shadow-sm hover:shadow transition"
          onClick={toggleWishlist}
        >
          {isInWishlist ? (
            <HeartOff className="w-5 h-5 text-red-500 hover:text-gray-500 transition" />
          ) : (
            <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition" />
          )}
        </button>
      </div>

      <h3 className="text-sm font-medium text-gray-800 mb-2 truncate">
        {product.name}
      </h3>
      <p className="text-xs text-gray-500 mb-1">Код товара: {product.id}</p>
      <p className="text-gray-600 text-base font-semibold mb-1">
        {product.price} грн
      </p>
      <p
        className={`text-sm font-medium mb-2 ${
          product.quantity === 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {product.quantity === 0
          ? "Нет в наличии"
          : `В наличии ${product.quantity}`}
      </p>

      <div className="flex items-center text-yellow-400 text-xs mb-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < product.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
      </div>

      <button
        className="flex items-center justify-center w-full bg-green-600 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md shadow-sm transition mt-4"
        onClick={handleButtonClick}
      >
        {isInBasket ? (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Удалить из корзины
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Добавить в корзину
          </>
        )}
      </button>
    </div>
  );
});

export default ProductItem;
