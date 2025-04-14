import { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import CategoryService from "../services/CategoryService";

const CategoryManagement = observer(() => {
  const { product } = useContext(Context);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categoryCreateError, setCategoryCreateError] = useState("");

  const [deleteModalData, setDeleteModalData] = useState(null);
  const [categoryDeleteError, setCategoryDeleteError] = useState("");
  const [deleteCategoryName, setDeleteCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.fetchCategories();
        product.setCategories(response.data);
      } catch (e) {
        console.error("Ошибка при загрузке категорий:", e);
      }
    };
    fetchCategories();
  }, [product]);

  const createCategoryHandler = async () => {
    try {
      const response = await CategoryService.createCategories(
        categoryName,
        parentCategory || null
      );
      const newCategory = response.data;

      if (parentCategory) {
        product.setCategories(
          product.categories.map((cat) => {
            if (cat.id === parseInt(parentCategory)) {
              return {
                ...cat,
                subcategories: [...(cat.subcategories || []), newCategory],
              };
            }
            return cat;
          })
        );
      } else {
        product.addCategory(newCategory);
      }

      setCategoryName("");
      setParentCategory("");
      setCategoryCreateError("");
    } catch (e) {
      setCategoryCreateError(
        e.response?.data?.message || "Ошибка при создании категории"
      );
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
        product.removeCategoryByName(name);
      } else if (type === "subcategory") {
        product.setCategories(
          product.categories.map((cat) => {
            if (cat.id === parentId) {
              return {
                ...cat,
                subcategories: cat.subcategories.filter(
                  (sub) => sub.name !== name
                ),
              };
            }
            return cat;
          })
        );
      }
    } catch (e) {
      console.error(
        e.response?.data?.message ||
          `Ошибка при удалении ${
            type === "category" ? "категории" : "подкатегории"
          }`
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
      product.removeCategoryByName(deleteCategoryName);
      setCategoryDeleteError("");
      setDeleteCategoryName("");
    } catch (e) {
      setCategoryDeleteError(
        e.response?.data?.message || "Ошибка при удалении категории"
      );
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Керування категоріями
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Створення */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Створити категорію
          </h3>
          <input
            type="text"
            placeholder="Назва категорії"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">
              Виберіть батьківську категорію (необов&apos;язково)
            </option>
            {product.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={createCategoryHandler}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition"
          >
            Створити
          </button>
          {categoryCreateError && (
            <div className="mt-4 text-red-600">{categoryCreateError}</div>
          )}
        </div>

        {/* Список */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Список категорій
          </h3>
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-200 pr-2">
            {product.categories.length > 0 ? (
              <ul className="space-y-4">
                {product.categories.map((category) => (
                  <li
                    key={category.id}
                    className="border-b border-gray-200 pb-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">
                        {category.name}
                      </span>
                      <button
                        onClick={() =>
                          openDeleteModalForCategory(category.name)
                        }
                        className="bg-red-600 text-white p-1 rounded hover:bg-red-800 transition"
                      >
                        Видалити
                      </button>
                    </div>
                    {category.subcategories?.length > 0 && (
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
                                  openDeleteModalForSubCategory(
                                    category.id,
                                    sub.name
                                  )
                                }
                                className="bg-red-600 text-white p-1 rounded hover:bg-red-800 transition"
                              >
                                Видалити
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
              <p className="text-center text-gray-600 mt-4">
                Категорії не завантажені
              </p>
            )}
          </div>
        </div>

        {/* Видалення по назві */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Видалити категорію за назвою
          </h3>
          <input
            type="text"
            placeholder="Введіть назву категорії"
            value={deleteCategoryName}
            onChange={(e) => setDeleteCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={deleteCategoryByNameHandler}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800 transition"
          >
            Видалити
          </button>
          {categoryDeleteError && (
            <div className="mt-4 text-red-600">{categoryDeleteError}</div>
          )}
        </div>
      </div>

      {/* Модалка */}
      {deleteModalData && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-red-900">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Підтвердіть видалення
            </h3>
            <p>
              Ви впевнені, що хочете видалити{" "}
              {deleteModalData.type === "category"
                ? "категорію"
                : "підкатегорію"}{" "}
              &quot;{deleteModalData.name}&quot;?
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={confirmDeleteHandler}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Видалити
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-500"
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

export default CategoryManagement;
