import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import BrandService from "../services/BrandService";

const BrandManagement = observer(() => {
  const { product } = useContext(Context);
  const [newBrand, setNewBrand] = useState("");
  const [deleteBrandName, setDeleteBrandName] = useState("");
  const [createError, setCreateError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createBrand = async () => {
    try {
      const response = await BrandService.createBrand(newBrand);
      product.addBrand(response.data);
      setCreateError("");
      setNewBrand("");
    } catch (e) {
      setCreateError(
        e.response?.data?.message || "Помилка при створенні бренду"
      );
    }
  };

  const confirmDelete = (name) => {
    setDeleteBrandName(name);
    setIsModalOpen(true);
  };

  const deleteBrand = async () => {
    if (!deleteBrandName) {
      setDeleteError("Назва бренду не може бути порожньою");
      return;
    }
    try {
      await BrandService.deleteOneBrand(deleteBrandName);
      product.removeBrandByName(deleteBrandName);
      setDeleteError("");
    } catch (e) {
      setDeleteError(
        e.response?.data?.message || "Помилка при видаленні бренду"
      );
    } finally {
      setIsModalOpen(false);
      setDeleteBrandName("");
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await BrandService.fetchBrands();
        product.setBrands(res.data);
      } catch (e) {
        console.error("Помилка при завантаженні брендів:", e);
      }
    };
    fetchBrands();
  }, [product]);

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Керування брендами
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Створення */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Створити бренд
          </h3>
          <input
            type="text"
            placeholder="Назва бренду"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={createBrand}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition"
          >
            Створити
          </button>
          {createError && (
            <div className="mt-4 text-red-600">{createError}</div>
          )}
        </div>

        {/* Список */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Список брендів
          </h3>
          {product.brands.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-200 pr-2">
              {product.brands.map((b) => (
                <li
                  key={b.id}
                  className="flex justify-between items-center border-b border-gray-200 pb-2"
                >
                  <span className="text-gray-700 font-medium">{b.name}</span>
                  <button
                    onClick={() => confirmDelete(b.name)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 transition"
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm mt-2">Немає брендів</p>
          )}
        </div>

        {/* Ручне видалення */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Видалити бренд за назвою
          </h3>
          <input
            type="text"
            placeholder="Введіть назву бренду"
            value={deleteBrandName}
            onChange={(e) => setDeleteBrandName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={deleteBrand}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800 transition"
          >
            Видалити
          </button>
          {deleteError && (
            <div className="mt-4 text-red-600">{deleteError}</div>
          )}
        </div>
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-red-900">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Підтвердження видалення
            </h3>
            <p>
              Ви впевнені, що хочете видалити бренд{" "}
              <strong>{deleteBrandName}</strong>?
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={deleteBrand}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition"
              >
                Видалити
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded text-gray-800 hover:bg-gray-500 transition"
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default BrandManagement;
