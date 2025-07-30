import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/header";

export default function ShopLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
