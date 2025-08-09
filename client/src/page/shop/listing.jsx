import React, { useEffect, useState } from "react";
import LeftFilterSidebar from "../../components/leftFilterSidebar";
import TopFilterSidebar from "../../components/topFilterSidebar";
import ProductList from "../../components/product-list";
import { _get } from "../../lib/api";
import { useSearchParams } from "react-router-dom";

export default function Listing() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";

  // fetch all products
  const fetchProduct = async () => {
    try {
      const res = await _get(`product/get?category=${category}&brand=${brand}`);
      if (res.data.success) {
        setData(res.data);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [category, brand]);
  return (
    <>
      <div className="grid grid-cols-12 h-screen overflow-hidden">
        {/* Left Sidebar (sticky) */}
        <div className="col-span-2 sticky top-20 h-screen overflow-y-auto border-r bg-white p-5">
          <LeftFilterSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-10 flex flex-col h-screen overflow-hidden">
          {/* Top Filter (sticky) */}
          <div className="sticky top-0 z-10 bg-white border-b p-5">
            <TopFilterSidebar />
          </div>

          {/* Product List (scrollable) */}
          <div className="overflow-y-auto flex-1 p-4">
            <div className="grid grid-cols-4 gap-5 my-5">
              {data?.data?.length > 0 ? (
                data.data.map((v, i) => <ProductList item={v} key={i} />)
              ) : (
                <p className="text-center">Product not found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
