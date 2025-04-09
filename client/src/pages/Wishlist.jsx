import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import ProductItem from "../components/ProductItem";

const Wishlist = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    product.loadWishlist();
  }, [product]);

  console.log("Wishlist items:", product.wishlistItems);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">💚 Избранные товары</h1>
      {product.wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {product.wishlistItems.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Список избранного пуст.</p>
      )}
    </div>
  );
});

export default Wishlist;
