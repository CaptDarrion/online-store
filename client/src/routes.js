import Admin from "./pages/Admin"
import { ABOUT_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, BLOG_ROUTE, BRAND_ROUTE, CONTACTS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"
import Basket from "./pages/Basket"
import Shop from "./pages/Shop"
import Auth from "./pages/Auth"
import ProductPage from "./pages/ProductPage"
import About from "./pages/About"
import Contacts from "./pages/Contacts"
import Blog from "./pages/Blog"
import Home from "./pages/Home"
import Brand from "./pages/Brand"



export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    { 
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: BLOG_ROUTE,
        Component: Blog
    },
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: BRAND_ROUTE,
        Component: Brand
    }

    
]