import React, { useEffect, useState } from "react";
import LeftFilterSidebar from "../../components/leftFilterSidebar";
import TopFilterSidebar from "../../components/topFilterSidebar";
import ProductList from "../../components/product-list";
import { _get } from "../../lib/api";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Loader } from "lucide-react";
import LoadingSpinner from "../../components/loding";

export default function Listing() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [sortByValue, setSortByValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // pagination
  const [totalPageCount, setTotalPageCount] = useState(1); // total page
  const [currentPage, setCurrentPage] = useState(1); // current page
  const [syncCurrentPage, setSyncCurrentPage] = useState(0); // get value when we click on pagination (always gives one less value like if  we click 2 so it gives 1 ans so on)
  const limit = 8;

  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";

  const onSortChange = (value) => {
    setSortByValue(value);
  };

  // fetch all products
  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const res = await _get(
        `product/get?category=${category}&brand=${brand}&sortBy=${sortByValue}&page=${currentPage}&limit=${limit}`
      );
      if (res.data.success) {
        setData(res.data);
        setTotalPageCount(res.data.totalPages);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [category, brand, sortByValue, currentPage]);

  // 🔹 Handle page click
  const handlePageClick = (event) => {
    setSyncCurrentPage(event.selected); // orginal value (less value always)
    setCurrentPage(event.selected + 1); // increase value when we get
  };

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
            <TopFilterSidebar
              totalItem={data?.data}
              onSortChange={onSortChange}
            />
          </div>

          <div className="overflow-y-auto flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-5">
              {isLoading ? (
                // Center the spinner and make it span the full grid width
                <div className="col-span-full flex justify-center py-10">
                  <LoadingSpinner />
                </div>
              ) : data?.data?.length > 0 ? (
                <>
                  {data.data.map((v, i) => (
                    <ProductList item={v} key={v.id ?? i} />
                  ))}

                  {/* Put pagination on its own row spanning all columns */}
                  <div className="col-span-full">
                    <ReactPaginate
                      previousLabel={"←"}
                      nextLabel={"→"}
                      breakLabel={"..."}
                      pageCount={totalPageCount}
                      forcePage={syncCurrentPage}
                      marginPagesDisplayed={3}
                      pageRangeDisplayed={2}
                      onPageChange={handlePageClick}
                      containerClassName={"react-paginate"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  </div>
                </>
              ) : (
                <p className="text-center col-span-full">Product not found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
