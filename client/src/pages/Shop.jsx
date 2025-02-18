import { observer } from "mobx-react";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";

const Shop = observer(() => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Боковая панель */}
      <div className="w-full md:w-1/4 lg:max-w-xs">
        <CategoryBar />
      </div>

      {/* Список товаров */}
      <div className="w-full md:w-3/4">
        <ProductList />
      </div>
    </div>
  );
});

export default Shop;
