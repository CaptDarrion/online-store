import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Context } from "../main";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";

const CategoryBar = observer(() => {
  const { product } = useContext(Context);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
  };

  return (
    <div className="md:relative">
      {/* Кнопка для мобильных устройств */}
      <button
        className="flex items-center justify-between md:hidden bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg mb-2 w-full"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <span>Категории</span>
        <Menu size={20} />
      </button>

      {/* Содержимое боковой панели */}
      <div
        className={`bg-white border border-green-200 p-4 rounded-lg shadow-lg transition-all duration-300 ${isSidebarOpen ? "block" : "hidden"} md:block`}
      >
        <h2 className="text-lg font-bold mb-3 text-gray-800">Категории</h2>
        <div className="space-y-2">
          {product.categories.filter(category => category.parentId === null).map((category) => (
            <div key={category.id} className="mb-1">
              <div
                className="flex justify-between items-center cursor-pointer text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition border-b border-gray-300"
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
                {selectedCategory === category.id ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>

              {/* Отображение подкатегорий, если категория выбрана */}
              {selectedCategory === category.id && category.subcategories && (
                <div className="ml-4 mt-1 border-l border-gray-400 pl-2">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-200 p-2 rounded-lg transition"
                    >
                      {subcategory.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});


export default CategoryBar;
