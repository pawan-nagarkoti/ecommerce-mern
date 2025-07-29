import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/admin/dashboard";
import Order from "./page/admin/order";
import Product from "./page/admin/product";

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Dashboard />}>
        <Route path="product" element={<Product />} />
        <Route path="order" element={<Order />} />
      </Route>
    </Routes>
  );
}
