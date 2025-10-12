import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./page/admin/dashboard";
import OrderContainer from "./page/admin/orderContainer";
import Product from "./page/admin/product";
import AdminLayout from "./page/admin/adminLayout";
import LoginPage from "./page/auth/login";
import ShopLayout from "./page/shop/shopLayout";
import Listing from "./page/shop/listing";
import Home from "./page/shop/home";
import Checkout from "./page/shop/checkout";
import Account from "./page/shop/account";
import SearchProduct from "./page/shop/search";
import useUI from "./contexts/UIContext";
import DialogContainer from "./components/dilog-container";
import ProductDetail from "./page/shop/product-detail";
import Unauthorized from "./components/unauthorized";
import { useEffect } from "react";
import useCookie from "./hooks/useCookie";

export default function App() {
  const { isDiloagModalOpen, isProductId } = useUI();
  const navigate = useNavigate();
  const location = useLocation();
  const { getCookie } = useCookie();

  useEffect(() => {
    if (location.pathname === "/" && !getCookie("accessToken")) {
      return navigate("/login");
    }

    if (
      location.pathname === "/" &&
      getCookie("accessToken") &&
      getCookie("loginUserInfo").role === "admin"
    ) {
      return navigate("/admin");
    }

    if (
      location.pathname === "/" &&
      getCookie("accessToken") &&
      getCookie("loginUserInfo").role === "user"
    ) {
      return navigate("/shop/home");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/shop" element={<ShopLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="search" element={<SearchProduct />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<OrderContainer />} />
        </Route>
      </Routes>

      {isDiloagModalOpen && isProductId && (
        <DialogContainer title="Product Detail" customWidth="900px">
          <ProductDetail />
        </DialogContainer>
      )}
    </>
  );
}
