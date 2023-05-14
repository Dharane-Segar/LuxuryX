import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Location from "./pages/Location";
import Product from "./pages/shop/all";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/checkout";
import ForgotPwd from "./pages/auth/forgotPwd";
import PasswordForm from "./pages/auth/PasswordForm";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/location" element={<Location />} />
        <Route path="/allItems" element={<Product />} />
        <Route path="/ProdCart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pwd" element={<ForgotPwd />} />
        <Route path="/otp" element={<PasswordForm />} />
      </Routes>
    </>
  );
}

export default App;
