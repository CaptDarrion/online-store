import { useState, useEffect } from "react";
import CategoryService from "../services/CategoryService";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categoryCreateError, setCategoryCreateError] = useState("");

  const [deleteModalData, setDeleteModalData] = useState(null);
  const [categoryDeleteError, setCategoryDeleteError] = useState("");
  const [deleteCategoryName, setDeleteCategoryName] = useState(""); 

  const fetchCategoriesHandler = async () => {
    try {
      const response = await CategoryService.fetchCategories();
      setCategories(response.data);
    } catch (e) {
      console.error("Ошибка при загрузке категорий:", e);
    }
  };

  const createCategoryHandler = async () => {
    try {
      await CategoryService.createCategories(categoryName, parentCategory || null);
      setCategoryName("");
      setParentCategory("");
      setCategoryCreateError("");
      fetchCategoriesHandler();
    } catch (e) {
      setCategoryCreateError(e.response?.data?.message || "Ошибка при создании категории");
    }
  };

  const openDeleteModalForCategory = (name) => {
    setDeleteModalData({ type: "category", name });
  };

  const openDeleteModalForSubCategory = (parentId, name) => {
    setDeleteModalData({ type: "subcategory", name, parentId });
  };

  const closeDeleteModal = () => {
    setDeleteModalData(null);
  };

  const confirmDeleteHandler = async () => {
    if (!deleteModalData) return;
    const { type, name, parentId } = deleteModalData;
    try {
      await CategoryService.deleteCategories(name);
      if (type === "category") {
        setCategories((prev) =>
          prev.filter((category) => category.name !== name)
        );
      } else if (type === "subcategory") {
        setCategories((prev) =>
          prev.map((category) => {
            if (category.id === parentId) {
              return {
                ...category,
                subcategories: category.subcategories.filter(
                  (sub) => sub.name !== name
                ),
              };
            }
            return category;
          })
        );
      }
      alert(`${type === "category" ? "Категория" : "Подкатегория"} удалена`);
    } catch (e) {
      console.error(
        e.response?.data?.message ||
          `Ошибка при удалении ${type === "category" ? "категории" : "подкатегории"}`
      );
    } finally {
      closeDeleteModal();
    }
  };
  

  const deleteCategoryByNameHandler = async () => {
    if (!deleteCategoryName) {
      setCategoryDeleteError("Название категории не может быть пустым");
      return;
    }

    try {
      await CategoryService.deleteCategories(deleteCategoryName);
      setCategories((prevCategories) => prevCategories.filter((category) => category.name !== deleteCategoryName));
      alert("Категория удалена");
      setCategoryDeleteError("");
      fetchCategoriesHandler();
    } catch (e) {
      setCategoryDeleteError(e.response?.data?.message || "Ошибка при удалении категории");
    }
  };

  useEffect(() => {
    fetchCategoriesHandler();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Управление категориями</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Форма создания категории */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[350px] border border-blue-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Создать категорию</h3>
          <input
            type="text"
            placeholder="Название категории"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Выберите родительскую категорию (необязательно)</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={createCategoryHandler}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition"
          >
            Создать
          </button>
          {categoryCreateError && (
            <div className="mt-4 text-red-600">{categoryCreateError}</div>
          )}
        </div>

        {/* Список категорий */}
<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[350px] border border-green-600">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">Список категорий</h3>
  <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-200">
    {categories.length > 0 ? (
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.id} className="border-b border-gray-300 pb-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{category.name}</span>
              <button
                onClick={() => openDeleteModalForCategory(category.name)}
                className="bg-red-600 text-white p-1 rounded hover:bg-red-800 transition"
              >
                Удалить
              </button>
            </div>
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="ml-4 mt-2">
                <ul className="space-y-2">
                  {category.subcategories.map((sub) => (
                    <li
                      key={sub.id}
                      className="flex justify-between items-center text-gray-600 text-sm pl-2 border-l-2 border-gray-400"
                    >
                      <span>{sub.name}</span>
                      <button
                        onClick={() =>
                          openDeleteModalForSubCategory(category.id, sub.name)
                        }
                        className="bg-red-600 text-white p-1 rounded hover:bg-red-800 transition"
                      >
                        Удалить
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-600 mt-4">Категории не загружены</p>
    )}
  </div>
</div>


        {/* Карточка для удаления категории по имени */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[350px] border border-red-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Удалить категорию по имени</h3>
          <input
            type="text"
            placeholder="Введите имя категории для удаления"
            value={deleteCategoryName}
            onChange={(e) => setDeleteCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={deleteCategoryByNameHandler}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800 transition"
          >
            Удалить
          </button>
          {categoryDeleteError && (
            <div className="mt-4 text-red-600">{categoryDeleteError}</div>
          )}
        </div>

      </div>

      {/* Модальное окно подтверждения удаления */}
      {deleteModalData && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-red-900">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Подтвердите удаление
            </h3>
            <p>
              Вы уверены, что хотите удалить{" "}
              {deleteModalData.type === "category"
                ? "категорию"
                : "подкатегорию"}{" "}
              &quot;{deleteModalData.name}&quot;?
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={confirmDeleteHandler}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Удалить
              </button>
              <button
                onClick={closeDeleteModal}
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

export default CategoryManagement;
