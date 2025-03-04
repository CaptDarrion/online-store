import { useEffect, useState } from "react";
import WishlistService from "../services/WishlistService";
import ProductItem from "../components/ProductItem";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await WishlistService.fetchWishlist();
        setWishlist(response.data); // предполагаем, что сервер возвращает массив товаров
      } catch (error) {
        console.error("Ошибка загрузки вишлиста:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Избранные товары</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Вы пока ничего не добавили в избранное.</p>
      )}
    </div>
  );
};

export default Wishlist;
