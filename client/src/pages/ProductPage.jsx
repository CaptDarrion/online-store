import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductService";

const ProductPage = () => {
  const [product, setProduct] = useState({ info: [] });
  const [activeTab, setActiveTab] = useState("characteristics");
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.fetchOneProduct(id);
        console.log("Полученные данные товара:", response.data);
        setProduct(response.data);
      } catch (e) {
        console.error("Ошибка при загрузке товара:", e);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product || !product.name) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Загрузка...
      </div>
    );
  }

  const previewImages = [product.img]; 

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 " >
      {/* Основной контейнер */}
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8 border border-green-200">
        {/* Заголовок товара */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {product.name}
        </h1>

        {/* Верхняя часть: изображения + блок с ценой и кнопками */}
        <div className="flex flex-col md:flex-row">
          {/* Левая колонка: превью изображений */}
          <div className="md:w-1/6 mb-4 md:mb-0 md:mr-4">
            {previewImages.map((imgUrl, idx) => (
              <div key={idx} className="mb-2 flex justify-center">
                {imgUrl ? (
                  <img
                    src={`http://localhost:5000/${imgUrl}`}
                    alt={`preview-${idx}`}
                    className="w-16 h-16 object-contain border border-gray-200 rounded p-1"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center text-gray-500 border border-gray-200 rounded">
                    Нет фото
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Центральная колонка: главное изображение */}
          <div className="md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
            {product.img ? (
              <img
                src={`http://localhost:5000/${product.img}`}
                alt={product.name}
                className="object-contain h-96 w-full rounded "
              />
            ) : (
              <div className="text-gray-500">Изображение не доступно</div>
            )}
          </div>

          {/* Правая колонка: цена, кнопки, наличие, доставка */}
          <div className="md:w-1/3 flex flex-col space-y-4">
            {/* Цена */}
            <div className="p-4 border border-blue-200 rounded shadow-sm">
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {product.price} грн
              </p>
              <p className="text-sm text-green-600 font-semibold mb-2">
                В наличии
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200">
                  Купить
                </button>
  
              </div>
            </div>

            {/* Блок доставки/оплаты (пример) */}
            <div className="p-4 border border-blue-200 rounded shadow-sm text-sm text-gray-700">
              <p className="font-semibold mb-2">Доставка</p>
              <p className="mb-2">Самовывоз по адресу Приморська-12, Одеса, Україна </p>
              <p className="mb-2">Доставка курьером по Одессе</p>
              <p className="mb-2">Отправка Новой Почтой</p>
              <hr className="my-2" />
              <p className="font-semibold mb-2">Оплата</p>
              <p className="mb-2">Наличными при получении</p>
              <p className="mb-2">Картой Visa/MasterCard</p>
            </div>

            {/* Гарантия  */}
            <div className="p-4 border border-blue-200 rounded shadow-sm text-sm text-gray-700">
              <p className="font-semibold mb-2">Гарантия</p>
              <p>Официальная гарантия от производителя</p>
              <p> Возврат/ Обмен в течении 30 дней</p>
            </div>
          </div>
        </div>

        {/* Блок с табами (Характеристики / Отзывы) */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab("characteristics")}
                className={`py-2 px-4 border-b-2 font-medium ${
                  activeTab === "characteristics"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Характеристики
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-2 px-4 border-b-2 font-medium ${
                  activeTab === "reviews"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Отзывы
              </button>
            </nav>
          </div>

          <div className="mt-4">
            {/* Характеристики */}
            {activeTab === "characteristics" && (
              <div>
                {product.info && product.info.length > 0 ? (
                  <table className="min-w-full border text-sm">
                    <tbody>
                      {product.info.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-2 px-4 font-medium text-gray-700 w-1/3">
                            {item.title}
                          </td>
                          <td className="py-2 px-4 text-gray-600">
                            {item.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600">
                    Нет характеристик для этого товара
                  </p>
                )}
              </div>
            )}


            {/* Отзывы */}
            {activeTab === "reviews" && (
              <div>
                <p className="text-gray-600">Отзывов пока нет</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
