import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import WishlistService from "../services/WishlistService";
import BasketService from "../services/BasketService";
import {Heart, HeartOff, ShoppingCart } from "lucide-react";

const ProductPage = () => {
  const [product, setProduct] = useState({ info: [] });
  const [activeTab, setActiveTab] = useState("characteristics");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInBasket, setIsInBasket] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.fetchOneProduct(id);
        setProduct(response.data);
      } catch (e) {
        console.error("Ошибка при загрузке товара:", e);
      }
    };

    const checkWishlist = async () => {
      try {
        const { data } = await WishlistService.fetchWishlist();
        setIsInWishlist(data.some((item) => item.id === Number(id)));
      } catch (error) {
        console.error("Ошибка при проверке вишлиста:", error);
      }
    };

    const checkBasket = async () => {
      try {
        const { data } = await BasketService.fetchBasket();
        setIsInBasket(data.some((item) => item.id === Number(id)));
      } catch (error) {
        console.error("Ошибка при проверке корзины:", error);
      }
    };

    fetchProduct();
    checkWishlist();
    checkBasket();
  }, [id]);

  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        await WishlistService.removeFromWishlist(id);
      } else {
        await WishlistService.addToWishlist(id);
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Ошибка при обновлении вишлиста:", error);
    }
  };

  const toggleBasket = async () => {
    try {
      if (isInBasket) {
        await BasketService.removeFromBasket(id);
      } else {
        await BasketService.addToBasket(id);
      }
      setIsInBasket(!isInBasket);
    } catch (error) {
      console.error("Ошибка при обновлении корзины:", error);
    }
  };

  if (!product || !product.name) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Основной контейнер */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
        {/* Заголовок товара */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          {product.name}
        </h1>

        {/* Верхняя часть: изображение + информация о товаре */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Главное изображение */}
          <div className="md:w-2/3 flex items-center justify-center">
            {product.img ? (
              <img
                src={`http://localhost:5000/${product.img}`}
                alt={product.name}
                className="object-contain h-96 w-full rounded-lg shadow-md"
              />
            ) : (
              <div className="text-gray-500 text-center h-96 flex items-center justify-center w-full bg-gray-100 rounded-lg">
                Изображение не доступно
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="md:w-1/3 flex flex-col space-y-6">
            {/* Цена и кнопка */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-3xl font-bold text-gray-800 mb-3">
                {product.price} грн
              </p>
              <p className="text-sm text-green-600 font-semibold mb-4">
                В наличии
              </p>
                {/* Кнопка добавления в корзину */}
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 text-lg font-medium"
                onClick={toggleBasket}
              >
                {isInBasket ? (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Видалити з кошика
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Додати до кошика
                  </>
                )}
              </button>
              
              {/* Кнопка добавления в список желаемого */}
              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 text-lg font-medium mt-3"
                onClick={toggleWishlist}
              >
                {isInWishlist ? (
                  <>
                    <HeartOff className="w-5 h-5 text-red-500" />
                    Видалити зі списку бажаного
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 text-gray-500 hover:text-red-500" />
                    Додати до списку бажаного
                  </>
                )}
              </button>
            </div>

            {/* Доставка */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm text-sm text-gray-700">
              <p className="font-semibold mb-2 text-gray-800">Доставка</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Самовывоз по адресу Приморська-12, Одеса, Україна</li>
                <li>Доставка курьером по Одессе</li>
                <li>Отправка Новой Почтой</li>
              </ul>
            </div>

            {/* Оплата */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm text-sm text-gray-700">
              <p className="font-semibold mb-2 text-gray-800">Оплата</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Наличными при получении</li>
                <li>Картой Visa/MasterCard</li>
              </ul>
            </div>

            {/* Гарантия */}
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm text-sm text-gray-700">
              <p className="font-semibold mb-2 text-gray-800">Гарантия</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Официальная гарантия от производителя</li>
                <li>Возврат/обмен в течение 30 дней</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Табы: Характеристики и Отзывы */}
        <div className="mt-10">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("characteristics")}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "characteristics"
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Характеристики
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "reviews"
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Отзывы
              </button>
            </nav>
          </div>

          {/* Содержимое табов */}
          <div className="mt-4">
            {activeTab === "characteristics" && (
              <div>
                {product.info && product.info.length > 0 ? (
                  <div className="space-y-4">
                    {product.info.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:space-x-4"
                      >
                        <div className="sm:w-1/3 font-medium text-gray-700">
                          {item.title}
                        </div>
                        <div className="sm:w-2/3 text-gray-600">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Нет характеристик для этого товара</p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <p className="text-gray-600">Отзывов пока нет</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;