import { useState } from "react";
import AdminService from "../services/AdminService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [emailToDelete, setEmailToDelete] = useState(""); // Состояние для email

  const fetchUsersHandler = async () => {
    try {
      const response = await AdminService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.error("Ошибка при загрузке пользователей:", e);
    }
  };

  const deleteUserHandler = async () => {
    try {
      if (userToDelete) {
        await AdminService.deleteOneUser(userToDelete.email);
        setUsers(users.filter(user => user.email !== userToDelete.email));
        alert("Пользователь удален!");
      }
      setIsModalOpen(false);
      setUserToDelete(null);
    } catch (e) {
      console.error("Ошибка при удалении пользователя:", e);
      setError("Ошибка при удалении пользователя. Попробуйте позже.");
      setIsModalOpen(false); 
    }
  };

  // Функция для удаления пользователя по email
  const deleteUserByEmail = async () => {
    try {
      if (emailToDelete) {
        const user = users.find(user => user.email === emailToDelete);
        if (user) {
          await AdminService.deleteOneUser(user.email);
          setUsers(users.filter(user => user.email !== emailToDelete));
          alert("Пользователь удален!");
        } else {
          setError("Пользователь с таким email не найден.");
        }
      }
    } catch (e) {
      console.error("Ошибка при удалении пользователя:", e);
      setError("Ошибка при удалении пользователя. Попробуйте позже.");
    }
  };

  const openModal = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Управление пользователями</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Карточка загрузки пользователей */}
        <div className="bg-white p-8 rounded-lg shadow-md w-[350px] border border-green-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Загрузить пользователей</h3>
          <button
            onClick={fetchUsersHandler}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800 transition"
          >
            Загрузить
          </button>
        </div>

        {/* Карточка удаления пользователя по email */}
        <div className="bg-white p-8 rounded-lg shadow-md w-[350px] border border-red-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Удалить пользователя по email</h3>
          <input
            type="email"
            value={emailToDelete}
            onChange={(e) => setEmailToDelete(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Введите email"
          />
          <button
            onClick={deleteUserByEmail}
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800 transition"
          >
            Удалить
          </button>
        </div>

        {/* Карточка списка пользователей */}
        <div className="bg-white p-8 rounded-lg shadow-md w-[350px] border border-green-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Список пользователей</h3>
          {users.length > 0 ? (
            <ul className="mt-2 space-y-2 max-h-60 overflow-auto">
              {users.map((user) => (
                <li key={user.id} className="p-2 border-b border-gray-300">
                  <span className="block text-gray-700">{user.email}</span>
                  <span className="block text-gray-500">{user.role}</span>
                  <button
                    onClick={() => openModal(user)}
                    className="mt-2 bg-red-600 text-white p-1 rounded hover:bg-red-800 transition"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600 mt-4">Пользователи не загружены</p>
          )}
        </div>
      </div>

      {/* Сообщение об ошибке */}
      {error && <div className="text-red-600 mt-4">{error}</div>}

      {/* Модальное окно для подтверждения удаления */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-red-900">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Подтвердите удаление</h3>
            <p>Вы уверены, что хотите удалить пользователя {userToDelete?.email}?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={deleteUserHandler}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Удалить
              </button>
              <button
                onClick={closeModal}
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

export default UserManagement;
