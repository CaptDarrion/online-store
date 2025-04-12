import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import ProductItem from "../components/ProductItem";

const Wishlist = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    product.loadWishlist();
  }, [product]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/4 lg:max-w-xs">
        <h1 className="text-2xl font-bold mb-4">💚 Избранные товары</h1>
        <p className="text-gray-500">
          Здесь отображаются товары, которые вы добавили в избранное.
        </p>
      </div>
      <div className="w-full md:w-3/4">
        {product.wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {product.wishlistItems.map((item) => (
              <ProductItem key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Список избранного пуст.</p>
        )}
      </div>
    </div>
  );
});

export default Wishlist;
