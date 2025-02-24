import { observer } from "mobx-react";
import { useContext } from "react";
import { Context } from "../main"; 
import ProductItem from "./ProductItem";

const ProductList = observer(() => {
  const { product } = useContext(Context); 

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {product.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
});

export default ProductList;
