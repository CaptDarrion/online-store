import { useState } from "react";
import BrandService from "../services/BrandService";

const BrandManagement = () => {
  const [brand, setBrand] = useState("");
  const [error, setError] = useState("");

  const createBrandHandler = async () => {
    try {
      await BrandService.createBrand(brand);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Ошибка при создании бренда");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Управление брендами</h2>

      {/* Карточка создания бренда */}
      <div className="bg-white p-8 rounded-lg shadow-md w-[350px] border border-blue-600">
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

        {/* Вывод сообщений об ошибке и успехе */}
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default BrandManagement;
