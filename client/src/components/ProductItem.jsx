import { observer } from "mobx-react";
import { Star, ShoppingCart, Heart, HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";
import WishlistService from "../services/WishlistService";
import BasketService from "../services/BasketService";
import { useEffect, useState } from "react";

const ProductItem = observer(({ product }) => {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInBasket, setIsInBasket] = useState(false);

  useEffect(() => {

    WishlistService.fetchWishlist().then(({ data }) => {
      setIsInWishlist(data.some((item) => item.id === product.id));
    });

    BasketService.fetchBasket().then(({ data }) => {
      setIsInBasket(data.some((item) => item.id === product.id));
    });

  }, [product.id]);

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    try {
      if (isInWishlist) {
        await WishlistService.removeFromWishlist(product.id);
      } else {
        await WishlistService.addToWishlist(product.id);
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Ошибка при обновлении вишлиста:", error);
    }
  };

  const toggleBasket = async (e) => {
    e.stopPropagation();
    try {
      if (isInBasket) {
        await BasketService.removeFromBasket(product.id);
      } else {
        await BasketService.addToBasket(product.id);
      }
      setIsInBasket(!isInBasket);
    } catch (error) {
      console.error("Ошибка при обновлении корзины:", error);
    }
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-md p-3 transition hover:shadow-lg hover:border-green-500"
    onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id) }>
      {/* Изображение товара */}
      <img
        src={`http://localhost:5000/${product.img}`}
        alt={product.name}
        className="w-full h-48 object-contain rounded-md mb-2"
      />

     {/* Иконки сверху */}
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

      {/* Название товара */}
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
      <p className="text-green-600 text-sm font-medium mb-2">В наличии</p>

      {/* Рейтинг */}
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

      {/* Кнопка добавления в корзину */}
      <button 
        className="flex items-center justify-center w-full bg-green-600 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md shadow-sm transition"
        onClick={toggleBasket}
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
