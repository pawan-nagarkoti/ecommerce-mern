import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/admin/dashboard";
import Order from "./page/admin/order";
import Product from "./page/admin/product";
import AdminLayout from "./page/admin/adminLayout";
import LoginPage from "./page/login";

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product" element={<Product />} />
        <Route path="order" element={<Order />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
