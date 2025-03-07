import { useEffect, useState } from "react";
import WishlistService from "../services/WishlistService";
import ProductItem from "../components/ProductItem";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await WishlistService.fetchWishlist();
        setWishlist(response.data);
      } catch (e) {
        console.error("Ошибка загрузки вишлиста:", e);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
     
    <div className="w-full md:w-1/4 lg:max-w-xs">
    <h1 className="text-2xl font-bold mb-4">💚 Ваши избранные товары</h1>
        <p className="text-gray-500">
          Здесь собраны товары, которые вам понравились. Вы можете легко перейти к их покупке.
        </p>
    </div>

    {/* Список товаров */}
    <div className="w-full md:w-3/4">
            {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {wishlist.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Вы пока ничего не добавили в избранное.</p>
      )}
    </div>
  </div>
    
  );

};

export default Wishlist;
