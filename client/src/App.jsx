import { observer } from "mobx-react";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
import { useContext, useEffect } from "react";
import { Context } from "./main";

const App = observer(() => {
  const { user } = useContext(Context);
  const { product } = useContext(Context);

  useEffect(() => {
    const checkAuthAsync = async () => {
      if (localStorage.getItem("token")) {
        await user.checkAuth();
      }
    };
    product.loadAllProduct();
    product.loadWishlist();
    product.loadBasket();
    user.fetchProfile();

    checkAuthAsync();
  }, [product, user]);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      {/* <Footer /> */}
    </BrowserRouter>
  );
});

export default App;
