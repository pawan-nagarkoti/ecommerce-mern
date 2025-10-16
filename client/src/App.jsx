import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import Unauthorized from "./page/unauthorized";
import NotFound from "./page/notFound";
import ProtectedRoute from "./components/protectedRoute";
import EmailLogin from "./components/mailWithOtp";
import Feature from "./page/admin/feature";
import Coupons from "./page/admin/coupon";
import AdminCoupons from "./page/admin/coupon";
import { useEffect } from "react";
import useCookie from "./hooks/useCookie";

export default function App() {
  const { isDiloagModalOpen, isProductId } = useUI();
  const location = useLocation("");
  const navigate = useNavigate();
  const { getCookie } = useCookie();

  useEffect(() => {
    const loginUserInfo = getCookie("loginUserInfo");

    if (location.pathname === "/") {
      if (loginUserInfo) {
        const { role } = loginUserInfo;
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/shop/home");
        }
      } else {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="login/mail-with-otp" element={<EmailLogin />} />

        <Route path="/shop" element={<ShopLayout />}>
          <Route
            path="home"
            element={
              <ProtectedRoute roles={["user"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="listing"
            element={
              <ProtectedRoute roles={["user"]}>
                <Listing />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout"
            element={
              <ProtectedRoute roles={["user"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="account"
            element={
              <ProtectedRoute roles={["user"]}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="search"
            element={
              <ProtectedRoute roles={["user"]}>
                <SearchProduct />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <ProtectedRoute roles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="feature"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Feature />
              </ProtectedRoute>
            }
          />
          <Route
            path="product"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="order"
            element={
              <ProtectedRoute roles={["admin"]}>
                <OrderContainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="coupon"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminCoupons />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {isDiloagModalOpen && isProductId && (
        <DialogContainer title="Product Detail" customWidth="900px">
          <ProductDetail />
        </DialogContainer>
      )}
    </>
  );
}
