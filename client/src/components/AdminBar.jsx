import { useState } from "react";
import { Menu } from "lucide-react";

// eslint-disable-next-line react/prop-types
const AdminBar = ({ onSelect }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="md:relative">
      <button
        className="flex items-center justify-between md:hidden bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg mb-2 w-full"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <span>Админ панель</span>
        <Menu size={20} />
      </button>

      <div
        className={`bg-white border border-green-200 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-lg font-bold mb-3 text-gray-800">Админ панель</h2>
        <div className="space-y-2">
          <div
            className="cursor-pointer text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition border-b border-gray-300"
            onClick={() => onSelect("products")}
          >
            Управление товарами
          </div>
          <div
            className="cursor-pointer text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition border-b border-gray-300"
            onClick={() => onSelect("categories")}
          >
            Управление категориями
          </div>
          <div
            className="cursor-pointer text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition border-b border-gray-300"
            onClick={() => onSelect("brands")}
          >
            Управление брендами
          </div>
          <div
            className="cursor-pointer text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition border-b border-gray-300"
            onClick={() => onSelect("users")}
          >
            Управление пользователями
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBar;
