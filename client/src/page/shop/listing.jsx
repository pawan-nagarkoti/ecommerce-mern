import React from "react";
import LeftFilterSidebar from "../../components/leftFilterSidebar";
import TopFilterSidebar from "../../components/topFilterSidebar";
import ProductList from "../../components/product-list";
export default function Listing() {
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
              {Array.from({ length: 10 }, () => (
                <ProductList />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
