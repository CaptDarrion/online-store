import { useState } from "react";
import AdminService from "../services/AdminService";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const fetchUsersHandler = async () => {
        try {
        const response = await AdminService.fetchUsers();
        setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="flex items-start justify-center min-h-[calc(100vh-165px)] bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-[520px] h-[371px] mt-[230px]">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
    
            {/* Кнопка для получения пользователей */}
            <button
              onClick={fetchUsersHandler}
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800 transition"
            >
              Загрузить пользователей
            </button>
    
            {/* Выводим список пользователей */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Список пользователей:</h3>
              {users.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {users.map(user => (
                    <li key={user.id} className="p-2 border-b border-gray-300">
                      <span className="block text-gray-700">{user.email}</span>
                      <span className="block text-gray-500">{user.role}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-600 mt-4">Пользователи не загружены</p>
              )}
            </div>
          </div>
        </div>
      );

}

export default Admin;