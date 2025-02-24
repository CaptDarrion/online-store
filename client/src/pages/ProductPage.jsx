import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductService";

const ProductPage = () => {
  const [product, setProduct] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.fetchOneProduct(id);
        console.log("Полученные данные товара:", response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке товара:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product || !product.name) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Загрузка...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Изображение товара */}
        <div className="flex justify-center items-center">
          {product.img ? (
            <img
              width={300}
              height={300}
              src={`http://localhost:5000/${product.img}`}
              alt={product.name}
              className="w-72 h-72 object-contain rounded-lg shadow-md"
            />
          ) : (
            <div className="text-gray-600">Изображение не доступно</div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <div className="flex items-center justify-center bg-gradient-to-r from-yellow-300 to-yellow-500 text-white font-bold rounded-full w-24 h-24 text-2xl shadow-lg">
            {product.rating || 0} ★
          </div>
        </div>

        {/* Карточка с ценой и кнопкой */}
        <div className="flex flex-col items-center justify-center border border-gray-200 p-6 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.price} грн.</h3>
          <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-md">
            Добавить в корзину
          </button>
        </div>
      </div>

      {/* Характеристики товара */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Характеристики</h1>
        {product.info.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {product.info.map((info, index) => (
              <li key={index} className="py-3 px-4 flex justify-between items-center">
                <span className="font-medium text-gray-700">{info.title}</span>
                <span className="text-gray-600">{info.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Нет характеристик для этого товара</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
