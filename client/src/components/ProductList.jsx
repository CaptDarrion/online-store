import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "../main";
import { Star, ShoppingCart, Heart } from "lucide-react";

const ProductList = observer(() => {
  const { product } = useContext(Context);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4"> {/* Настроена равномерная сетка */}
      {product.products.map((productItem) => (
        <div
          key={productItem.id}
          className="relative bg-white border border-gray-200 rounded-lg shadow-md p-3 transition hover:shadow-lg hover:border-green-500"
        >
          {/* Изображение товара */}
          <img
            src={`path/to/your/images/${productItem.img}`} // Замените на правильный путь
            alt={productItem.name}
            className="w-full h-48 object-contain rounded-md mb-2" // Настроены размеры изображения
          />

          {/* Иконки сверху */}
          <div className="absolute top-2 right-2 flex space-x-1">
            <button className="bg-white p-2 rounded-full shadow-sm hover:shadow transition">
              <Heart className="text-gray-500 w-5 h-5 hover:text-red-500" />
            </button>
          </div>

          {/* Название товара */}
          <h3 className="text-sm font-medium text-gray-800 mb-2 truncate">
            {productItem.name}
          </h3>

          {/* Код товара */}
          <p className="text-xs text-gray-500 mb-1">
            Код товара: {productItem.id}
          </p>

          {/* Цена */}
          <p className="text-gray-600 text-base font-semibold mb-1">
            {productItem.price} грн
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
                    i < productItem.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
          </div>

          {/* Кнопка добавления в корзину */}
          <button className="flex items-center justify-center w-full bg-green-600 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md shadow-sm transition">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
});

export default ProductList;
