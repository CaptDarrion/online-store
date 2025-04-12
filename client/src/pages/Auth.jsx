import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Context } from "../main";
import { useContext, useState } from "react";
import { observer } from "mobx-react";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const HandleAuth = async () => {
    try {
      setErrorMessage("");
      if (isLogin) {
        await user.login(email, password);
      } else {
        await user.registration(email, password);
      }
      navigate(SHOP_ROUTE);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!isLogin && value.length < 3) {
      setPasswordError("Пароль должен содержать не менее 3 символов");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="flex items-start justify-center min-h-[calc(100vh-165px)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-[520px] h-[371px] mt-[230px] border border-green-200">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          {isLogin ? "Авторизация" : "Регистрация"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full p-2 border rounded ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}

        <div className="flex justify-between items-center text-sm text-gray-600 my-3">
          {/* Добавь потом функционал восстановления пароля */}
        </div>

        <button
          onClick={HandleAuth}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800 transition"
        >
          {isLogin ? "Login" : "Registration"}
        </button>

        {isLogin ? (
          <div className="text-center text-gray-600 mt-4">
            Не маєте акаунта?
            <NavLink
              to={REGISTRATION_ROUTE}
              className="text-green-600 hover:underline ml-1"
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-4">
            Вже маєте акаунт?
            <NavLink
              to={LOGIN_ROUTE}
              className="text-green-600 hover:underline ml-1"
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
});

export default Auth;
