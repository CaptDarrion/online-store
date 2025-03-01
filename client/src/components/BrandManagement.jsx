import { useState, useEffect } from "react";
import BrandService from "../services/BrandService";

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [deleteBrandName, setDeleteBrandName] = useState("");

  const [brandCreateError, setBrandCreateError] = useState("");
  const [brandDeleteError, setBrandDeleteError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBrandsHandler = async () => {
    try {
      const response = await BrandService.fetchBrands();
      setBrands(response.data);
    } catch (e) {
      console.error("Ошибка при загрузке брендов:", e);
    }
  };

  const createBrandHandler = async () => {
    try {
      await BrandService.createBrand(brand);
      alert("Бренд создан");
      setBrandCreateError("");
      fetchBrandsHandler();
    } catch (e) {
      setBrandCreateError(e.response?.data?.message || "Ошибка при создании бренда");
    }
  };

  const openModal = (brandName) => {
    setDeleteBrandName(brandName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteBrandName("");
  };

  const deleteBrandHandler = async () => {
    if (!deleteBrandName) {
      setBrandDeleteError("Название бренда не может быть пустым");
      return;
    }
    try {
      await BrandService.deleteOneBrand(deleteBrandName);
      setBrands((prevBrands) => prevBrands.filter((b) => b.name !== deleteBrandName));
      alert("Бренд удалён");
      setBrandDeleteError("");
    } catch (e) {
      setBrandDeleteError(e.response?.data?.message || "Ошибка при удалении бренда");
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    fetchBrandsHandler();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Управление брендами</h2>
      {/* Карточка создания бренда */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[350px] border border-blue-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Создать бренд</h3>
          <input
            type="text"
            placeholder="Название бренда"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={createBrandHandler}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition"
          >
            Создать бренд
          </button>
          {brandCreateError && <div className="mt-4 text-red-600">{brandCreateError}</div>}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[350px] mx-auto border border-green-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Список брендов</h3>
          {brands.length > 0 ? (
            <ul className="mt-2 space-y-2 max-h-60 overflow-auto">
              {brands.map((brand) => (
                <li key={brand.id} className="p-2 border-b border-gray-300 flex justify-between items-center">
                  <span className="text-gray-700 text-lg">{brand.name}</span>
                  <button
                    onClick={() => openModal(brand.name)}
                    className="bg-red-600 text-white p-1 rounded hover:bg-red-800 transition"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600 mt-4">Бренды не загружены</p>
          )}
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[350px] mx-auto border border-red-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Удалить бренд по имени</h3>
          <input
            type="text"
            value={deleteBrandName}
            onChange={(e) => setDeleteBrandName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Введите название бренда"
          />
          <button
            onClick={deleteBrandHandler}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800 transition"
          >
            Удалить
          </button>
          {brandDeleteError && <div className="mt-4 text-red-600">{brandDeleteError}</div>}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-red-900">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Подтвердите удаление</h3>
            <p>Вы уверены, что хотите удалить бренд {deleteBrandName}?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={deleteBrandHandler}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Удалить
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-500"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandManagement;
