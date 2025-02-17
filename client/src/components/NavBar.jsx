// NavBar.jsx
import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Context } from '../main';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import logo  from '../assets/icons/logo.svg'

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();


  return (
           <nav className="sticky top-0 left-0 w-full bg-gray-50 border-b border-gray-200 z-50">
            {/* Верхняя часть с адресом */}
            <div className="text-sm text-gray-600 p-4 md:ml-64">
                Stor Locaio: Licoln-44, Illinois, Chica, US
            </div>

            {/* Полоса между верхней и средней частью */}
            <div className="border-t border-gray-300"></div> {/* Это линия между частями */}

            {/* Средняя часть: логотип, название, поисковая строка, информация */}
            <div className="flex flex-col md:flex-row justify-between items-center p-4">
                {/* Логотип */}
                <div className="flex items-center space-x-2 md:ml-64">
                    <img src={logo} alt="Logo" className="h-10 w-10" />
                    <NavLink 
                        to={SHOP_ROUTE}
                        className="text-xl font-bold text-gray-800 text-green-950"
                    >
                        Natures&apos;s Prophet
                    </NavLink>
                </div>
                
                {/* Поиск и кнопка */}
                <div className="flex items-center space-x-4 w-full md:w-[40%] mx-auto mt-4 md:mt-0">
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800">
                        Search
                    </button>
                </div>

                {/* Информация справа с номером */}
                <div className="text-right md:text-left mt-4 md:mt-0 md:mr-64">
                    <p className="text-sm text-gray-600">Customer Services</p>
                    <p className="text-sm text-gray-600">(219) 555-0114</p>
                </div>
            </div>

            {/* Нижняя часть с кнопками, фон темно-серый */}
            <div className="bg-neutral-900 p-4 flex justify-between items-center">
                <ul className="flex justify-start space-x-6 md:ml-64">
                    <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                    <li><a href="/shop" className="text-gray-300 hover:text-white">Shop</a></li>
                    <li><a href="/pages" className="text-gray-300 hover:text-white">Pages</a></li>
                    <li><a href="/blog" className="text-gray-300 hover:text-white">Blog</a></li>
                    <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
                    <li><a href="/contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
                </ul>

                {/* Кнопки админ панели и авторизации */}
                <div className="flex space-x-4 mr-10">
                    {user.isAuth ? (
                        <>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={() => user.logout()}>Выйти</button>
                          <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition" onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</button>
                          <button  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" onClick={() => navigate(BASKET_ROUTE)}>Корзина</button>
                            
                        </>
                    ) : (
                        <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</button>
                    )}
                </div>
            </div>
        </nav>
  
  );
});

export default NavBar;
