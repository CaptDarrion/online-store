import { createContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserStore from "./store/UserStore.js";
import ProductStore from "./store/ProductStore.js";

const product = new ProductStore();
const user = new UserStore(product);

export const Context = createContext(null);

createRoot(document.getElementById("root")).render(
  <Context.Provider
    value={{
      user,
      product,
    }}
  >
    <App />
  </Context.Provider>
);
