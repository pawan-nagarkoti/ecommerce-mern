import { Route, Routes } from "react-router-dom";
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
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

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
