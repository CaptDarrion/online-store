import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Context } from "../main";
import { useContext, useState } from "react";
import { observer } from "mobx-react";


const Auth = observer(() => {
    const { user } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname == LOGIN_ROUTE
    
    const HandleAuth = async () => {
      try {
        if (isLogin) {
          await user.login(email,password)
        } else {
          await user.registration(email,password)
        }
        navigate(SHOP_ROUTE);
      } catch (e) {
        console.log(e);
      }
    } 


    return (
      <div className="flex items-start justify-center min-h-[calc(100vh-165px)] ">
        <div className="bg-white p-8 rounded-lg shadow-md w-[520px] h-[371px] mt-[230px] border border-green-200">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
          
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer">👁</span>
          </div>
  
          <div className="flex justify-between items-center text-sm text-gray-600 my-3">
            {/* <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">Forget Password</a> */}
          </div>
          { isLogin ? 
                    <button onClick={HandleAuth} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800 transition">
                    Login
                  </button>
            :
            <button onClick={HandleAuth} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800 transition">
            Registration
          </button>
          }

          { isLogin ? 
                <div className="text-center text-gray-600 mt-4">
                Не маєте акаунта?
                <NavLink to={REGISTRATION_ROUTE} className="text-green-600 hover:underline ml-1">
                Register
               </NavLink>
              </div>
            : 
                <div className="text-center text-gray-600 mt-4">
                Вже маєте акаунт? 
                <NavLink to={LOGIN_ROUTE} className="text-green-600 hover:underline ml-1">
                Login
                </NavLink>
          </div>
        }
    


           
       
        </div>
      </div>
    );
  });
  
  export default Auth;
  