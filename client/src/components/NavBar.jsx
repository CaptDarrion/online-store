import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Context } from '../main';
import { ABOUT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, BLOG_ROUTE, BRAND_ROUTE, CONTACTS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';
import { ShoppingCart } from 'lucide-react';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-50 border-b border-gray-200 z-50">
      {/* Верхняя часть с адресом и номером */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 p-4 md:ml-64 md:mr-64">
        <span>Місцезнаходження магазину: Приморська-12, Одеса, Україна</span>
        <span>Служба підтримки +380 (66) 134-80-11</span>
      </div>

      {/* Полоса между верхней и средней частью */}
      <div className="border-t border-gray-300"></div>

      {/* Средняя часть: логотип, название, поисковая строка */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4">
        {/* Логотип */}
        <div className="flex items-center space-x-2 md:ml-64">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <NavLink 
            to={SHOP_ROUTE}
            className="text-xl font-bold text-gray-800 text-green-950"
          >
            Nature&apos;s Prophet
          </NavLink>
        </div>

        {/* Поиск и кнопка */}
        <div className="flex items-center space-x-4 w-full md:w-[40%] mx-auto mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow min-w-0 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800">
            Search
          </button>
        </div>
      </div>

      {/* Нижняя часть с кнопками, фон темно-серый */}
      <div className="bg-neutral-900 p-4 flex flex-col md:flex-row justify-between items-center">
        <ul className="flex justify-center md:justify-start space-x-6 md:ml-64 mb-4 md:mb-0">
          <li className="text-gray-300 hover:text-white" onClick={() => navigate(HOME_ROUTE)}> Головна</li>
          <li className="text-gray-300 hover:text-white" onClick={() => navigate(SHOP_ROUTE)}> Продукція</li>
          <li className="text-gray-300 hover:text-white" onClick={() => navigate(BLOG_ROUTE)}> Блог</li>
          <li className="text-gray-300 hover:text-white" onClick={() => navigate(BRAND_ROUTE)}> Бренди</li>
          <li className="text-gray-300 hover:text-white" onClick={() => navigate(ABOUT_ROUTE)}> Про нас</li>
          <li className="text-gray-300 hover:text-white" onClick={() => navigate(CONTACTS_ROUTE)}> Контакти</li>
        </ul>

        {/* Кнопки админ панели и авторизации */}
        <div className="flex space-x-4 md:mr-10">
          {user.isAuth ? (
            <>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={() => user.logout()}>Вийти</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={() => navigate(BASKET_ROUTE)}>
                <ShoppingCart className="mr-2" />
              </button>
              {user.role === 'ADMIN' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 transition" onClick={() => navigate(ADMIN_ROUTE)}>Адмін панель</button>
              )}
            </>
          ) : (
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 transition" onClick={() => navigate(LOGIN_ROUTE)}>Авторизація</button>
          )}
        </div>
      </div>
    </nav>
  );
});

export default NavBar;
