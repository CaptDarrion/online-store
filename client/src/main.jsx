import { createContext } from "react";
import { createRoot } from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import App from "./App.jsx";
import UserStore from "./store/UserStore.js";
import ProductStore from "./store/ProductStore.js";

const product = new ProductStore();
const user = new UserStore(product);

export const Context = createContext(null);
console.log("Stripe key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById("root")).render(
  <Context.Provider
    value={{
      user,
      product,
    }}
  >
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Context.Provider>
);
