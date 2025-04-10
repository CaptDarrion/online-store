import { useContext, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { Context } from "../main";
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  BLOG_ROUTE,
  BRAND_ROUTE,
  CONTACTS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  SHOP_ROUTE,
  USER_PROFILE_ROUTE,
  WISHLIST_ROUTE,
} from "../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import logo from "../assets/icons/logo.svg";
import {
  ShoppingBasket,
  Heart,
  Search,
  UserCog,
  LogIn,
  LogOut,
} from "lucide-react";

const NavBar = observer(() => {
  const { user, product } = useContext(Context);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fuseOptions = useMemo(() => ({ keys: ["name", "description"] }), []);
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const fuse = new Fuse(product.products || [], fuseOptions);
    const results = fuse.search(searchQuery);
    setSearchResults(results.map((result) => result.item));
  }, [searchQuery, product.products, fuseOptions]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchResults.length > 0) {
      navigate(`${PRODUCT_ROUTE}/${searchResults[0].id}`);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleFocus = () => {
    if (searchQuery.trim() !== "") {
      const fuse = new Fuse(product.products || [], fuseOptions);
      const results = fuse.search(searchQuery);
      setSearchResults(results.map((result) => result.item));
    }
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-white shadow-lg z-50">
      {/* Верхня частина: адреса та номер телефону */}
      <div className="bg-gray-100 py-2 px-4 md:px-16 lg:px-32 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">
          <span>Місцезнаходження магазину: Приморська-12, Одеса, Україна</span>
          <span>Служба підтримки: +380 (66) 134-80-11</span>
        </div>
      </div>

      {/* Середня частина: логотип, назва, пошукова строка */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 md:ml-64 md:mr-64">
        {/* Логотип і назва */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <NavLink
            to={SHOP_ROUTE}
            className="text-3xl font-semibold text-green-900 hover:text-green-700 transition-colors font-[Poppins]"
          >
            Nature&apos;s Prophet
          </NavLink>
        </div>

        {/* Пошукова строка */}
        <div className="relative w-full md:w-[50%] lg:w-[40%]">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Пошук товарів..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setSearchResults([]), 200)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
            />
            <button
              onClick={handleSearchButtonClick}
              className="bg-green-700 text-white px-5 py-2.5 rounded-r-full hover:bg-green-800 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Випадаючий список із результатами */}
          {searchQuery && searchResults.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 max-h-64 overflow-y-auto shadow-xl z-50">
              {searchResults.map((productItem) => (
                <li
                  key={productItem.id}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    navigate(`${PRODUCT_ROUTE}/${productItem.id}`);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  <img
                    src={`http://localhost:5000/${productItem.img}`}
                    alt={productItem.name}
                    className="w-12 h-12 object-cover rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {productItem.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {productItem.price} грн
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Нижня частина: навігація та кнопки */}
      <div className="bg-black p-4 flex flex-col md:flex-row justify-between items-center">
        {/* Навігаційні посилання */}
        <ul className="flex flex-wrap justify-center md:justify-start space-x-6 md:space-x-8 mb-4 md:mb-0">
          <li>
            <NavLink
              to={HOME_ROUTE}
              className="text-gray-200 hover:text-green-400 transition-colors"
            >
              Головна
            </NavLink>
          </li>
          <li>
            <NavLink
              to={SHOP_ROUTE}
              className="text-gray-200 hover:text-green-400 transition-colors"
            >
              Продукція
            </NavLink>
          </li>
          <li>
            <NavLink
              to={BLOG_ROUTE}
              className="text-gray-200 hover:text-green-400 transition-colors"
            >
              Блог
            </NavLink>
          </li>
          <li>
            <NavLink
              to={BRAND_ROUTE}
              className="text-gray-200 hover:text-green-400 transition-colors"
            >
              Бренди
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ABOUT_ROUTE}
              className="text-gray-200 hover:text-green-400 transition-colors"
            >
              Про нас
            </NavLink>
          </li>
          <li>
            <NavLink
              to={CONTACTS_ROUTE}
              className="text-gray-200 hover:text-green-400 transition-colors"
            >
              Контакти
            </NavLink>
          </li>
        </ul>

        {/* Кнопки авторизації, корзини, обраного */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          {user.isAuth ? (
            <>
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={() => user.logout()}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Вийти
              </button>
              <button
                className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                onClick={() => navigate(BASKET_ROUTE)}
              >
                <ShoppingBasket className="w-5 h-5 mr-2" />
                Корзина
              </button>
              <button
                className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                onClick={() => navigate(WISHLIST_ROUTE)}
              >
                <Heart className="w-5 h-5 mr-2" />
                Обране
              </button>
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={() => navigate(USER_PROFILE_ROUTE)}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Профиль
              </button>
              {user.role === "ADMIN" && (
                <button
                  className="flex items-center px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  <UserCog className="w-5 h-5 mr-2" />
                  Адмін панель
                </button>
              )}
            </>
          ) : (
            <button
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors flex items-center"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              <LogIn className="w-5 h-5 mr-2" /> {/* Иконка слева от текста */}
              Авторизація
            </button>
          )}
        </div>
      </div>
    </nav>
  );
});

export default NavBar;
