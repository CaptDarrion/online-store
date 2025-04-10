import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main";

const UserInformationManagement = observer(() => {
  const { user } = useContext(Context);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await user.fetchProfile();
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    };
    loadProfile();
  }, [user]);

  const handleChange = (field, value) => {
    user.setProfile({ ...user.profile, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await user.updateProfile(
        user.profile.firstName,
        user.profile.lastName,
        user.profile.phone
      );
      setMessage("Данные успешно обновлены");
    } catch (error) {
      setMessage("Ошибка обновления данных");
      console.error("Ошибка обновления профиля:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Управление личной информацией</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Карточка с текущей информацией */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-blue-600">
          <h3 className="font-semibold mb-4">Мои данные</h3>
          <div className="space-y-2">
            <p>
              <strong>Имя:</strong> {user.profile.firstName || "Не указано"}
            </p>
            <p>
              <strong>Фамилия:</strong> {user.profile.lastName || "Не указано"}
            </p>
            <p>
              <strong>Телефон:</strong> {user.profile.phone || "Не указан"}
            </p>
            <p>
              <strong>Email:</strong> {user.user?.email || "Не указан"}
            </p>
            <p>
              <strong>Дата регистрации:</strong>{" "}
              {user.user?.createdAt &&
                new Date(user.user.createdAt).toLocaleDateString("uk-UA")}
            </p>
            <p>
              <strong>Статус подтверждения почты:</strong>{" "}
              {user.user?.isActivated ? "Подтвержден" : "Не подтвержден"}
            </p>
          </div>
        </div>

        {/* Форма для обновления данных */}
        <div className="bg-white p-6 rounded-2xl shadow-md border w-full border-green-600">
          <h3 className="font-semibold mb-4">Обновить данные</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Имя</label>
              <input
                type="text"
                value={user.profile.firstName || ""}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Введите имя"
              />
            </div>
            <div>
              <label className="block text-gray-700">Фамилия</label>
              <input
                type="text"
                value={user.profile.lastName || ""}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Введите фамилию"
              />
            </div>
            <div>
              <label className="block text-gray-700">Телефон</label>
              <input
                type="text"
                value={user.profile.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Введите номер телефона"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 transition duration-200"
            >
              Сохранить изменения
            </button>
          </form>
          {message && (
            <div className="mt-4 p-4 bg-green-100 text-green-600 rounded">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default UserInformationManagement;
