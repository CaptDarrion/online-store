import { useState } from "react";
import AdminService from "../services/AdminService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");

  const [createUserError, setCreateUserError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const fetchUsersHandler = async () => {
    try {
      const response = await AdminService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.error("Ошибка при загрузке пользователей:", e);
    }
  };

  const fetchAdminsHandler = async () => {
    try {
      const response = await AdminService.fetchAdmins("ADMIN");
      setAdmins(response.data);
    } catch (e) {
      console.error("Ошибка при загрузке администраторов:", e);
    }
  };

  const deleteUserByEmailCommon = async (targetEmail) => {
    await AdminService.deleteOneUser(targetEmail);
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.email !== targetEmail)
    );
    setAdmins((prevAdmins) =>
      prevAdmins.filter((admin) => admin.email !== targetEmail)
    );
    alert("Пользователь удален!");
  };

  const deleteUserHandler = async () => {
    if (!deleteEmail) return;
    try {
      await deleteUserByEmailCommon(deleteEmail);
      setDeleteError("");
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      setDeleteError("Ошибка при удалении пользователя:");
    } finally {
      setIsModalOpen(false);
      setDeleteEmail("");
    }
  };

  const deleteUserByEmail = async () => {
    if (!deleteEmail) return setDeleteError("Введите email для удаления.");
    const userExists = users.some((u) => u.email === deleteEmail);
    if (!userExists) {
      return setDeleteError("Пользователь с таким email не найден.");
    }
    try {
      await deleteUserByEmailCommon(deleteEmail);
      setDeleteError("");
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      setDeleteError("Ошибка при удалении пользователя:");
    } finally {
      setDeleteEmail("");
    }
  };

  const createUserHandler = async () => {
    try {
      await AdminService.createUser(email, password, role);
      alert("Пользователь создан!");
      setCreateUserError("");
      fetchUsersHandler();
      fetchAdminsHandler();
    } catch (e) {
      const errors = e.response?.data?.errors;
      errors
        ? setCreateUserError(
            `Ошибка: ${errors.map((err) => err.msg).join(", ")}`
          )
        : setCreateUserError("Произошла неизвестная ошибка. Попробуйте позже.");
    }
  };

  const openModal = (userEmail) => {
    setDeleteEmail(userEmail);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteEmail("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Управление пользователями</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {/* Загрузка пользователей */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-green-600">
          <h3 className="font-semibold mb-4">Загрузить пользователей</h3>
          <button
            onClick={fetchUsersHandler}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800"
          >
            Загрузить
          </button>
        </div>

        {/* Удаление пользователя */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-red-600">
          <h3 className="font-semibold mb-4">Удалить пользователя по email</h3>
          <input
            type="email"
            value={deleteEmail}
            onChange={(e) => setDeleteEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            placeholder="Введите email"
          />
          <button
            onClick={deleteUserByEmail}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-800"
          >
            Удалить
          </button>
          {deleteError && (
            <div className="text-red-600 mt-2">{deleteError}</div>
          )}
        </div>

        {/* Список пользователей */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-green-600">
          <h3 className="font-semibold mb-4">Список пользователей</h3>
          {users.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-auto">
              {users.map((user) => (
                <li key={user.id} className="border-b py-2">
                  <span className="block">{user.email}</span>
                  <span className="block text-sm text-gray-500">
                    {user.role}
                  </span>
                  <button
                    onClick={() => openModal(user.email)}
                    className="mt-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Пользователи не загружены</p>
          )}
        </div>

        {/* Загрузка админов */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-blue-600">
          <h3 className="font-semibold mb-4">Загрузить администраторов</h3>
          <button
            onClick={fetchAdminsHandler}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
          >
            Загрузить
          </button>
        </div>

        {/* Список админов */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-blue-600">
          <h3 className="font-semibold mb-4">Список администраторов</h3>
          {admins.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-auto">
              {admins.map((admin) => (
                <li key={admin.id} className="border-b py-2">
                  <span className="block">{admin.email}</span>
                  <span className="block text-sm text-gray-500">
                    {admin.role}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Администраторы не загружены</p>
          )}
        </div>

        {/* Создание пользователя */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-blue-600">
          <h3 className="font-semibold mb-4">Создать пользователя</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="USER">Пользователь</option>
            <option value="ADMIN">Администратор</option>
          </select>
          <button
            onClick={createUserHandler}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
          >
            Создать пользователя
          </button>
          {createUserError && (
            <div className="text-red-600 mt-2">{createUserError}</div>
          )}
        </div>
      </div>

      {/* Модалка */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg w-96 border border-red-900">
            <h3 className="font-semibold mb-4">Подтвердите удаление</h3>
            <p>
              Вы уверены, что хотите удалить пользователя{" "}
              <strong>{deleteEmail}</strong>?
            </p>
            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={deleteUserHandler}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Удалить
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500"
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
