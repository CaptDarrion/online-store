import { observer } from "mobx-react";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
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
        const response = await ProductService.fetchProducts(
          null, 
          null, 
          product.page, 
          product.limit
        );
        if (response.data && response.data.rows) {
          product.setProducts(response.data);
        } else {
          console.error("Данные не содержат 'rows' или 'count'");
        }
      } catch (e) {
        console.error('Ошибка при получении товаров:', e);
      }
    };
    

    fetchCategories();
    fetchProducts();
  }, [product, product.page])
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Боковая панель */}
      <div className="w-full md:w-1/4 lg:max-w-xs">
        <CategoryBar />
      </div>

      {/* Список товаров */}
      <div className="w-full md:w-3/4" >
      
        <ProductList />
        <Pagination />
      </div>
    </div>
  );
});

export default Shop;
