import { observer } from "mobx-react";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";

const Shop = observer(() => {
  const { product } = useContext(Context)
  useEffect(() => { 
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.fetchCategories();
        console.log(response.data)
        product.setCategories(response.data);
      } catch (e) {
        console.log(e)
      }

    }
    const fetchProducts = async () => {
      try {
        const response = await ProductService.fetchProducts();
        console.log(response.data)
        product.setProducts(response.data);
      } catch (e) {
        console.log(e)
      }
    }


    fetchCategories();
    fetchProducts();
  }, [product])
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
