import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import BasketService from "../services/BasketService";
import ProductItem from "../components/ProductItem";

const Basket = () => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const response = await BasketService.fetchBasket();
        setBasket(response.data);
      } catch (e) {
        console.error("Ошибка загрузки вишлиста:", e);
      }
    };

    fetchBasket();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
     
     <div className="w-full md:w-1/4 lg:max-w-xs">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <ShoppingCart className="w-7 h-7 text-green-600" />
          Ваша корзина
        </h1>
        <p className="text-gray-500">
          Здесь находятся товары, которые вы добавили в корзину. Оформите заказ, чтобы приобрести их.
        </p>
      </div>

    {/* Список товаров */}
    <div className="w-full md:w-3/4">
            {basket.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {basket.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Вы пока ничего не добавили в корзину.</p>
      )}
    </div>
  </div>
    
  );

};


export default Basket;