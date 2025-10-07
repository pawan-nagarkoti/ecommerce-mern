import { Button } from "@/components/ui/button";
import ProductCard from "../../components/product-card";
import ProductSlider from "./product-slider";
import { useEffect, useState } from "react";
import { _get } from "../../lib/api";
import useUI from "../../contexts/UIContext";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../../components/loding";

export default function Product() {
  const [data, setData] = useState([]);
  const { callProducts, setCallProducts } = useUI();
  const { setIsOpen } = useUI();
  const [isLoading, setIsLoading] = useState(false);

  // pagination
  const [totalPageCount, setTotalPageCount] = useState(1); // total page
  const [currentPage, setCurrentPage] = useState(1); // current page
  const [syncCurrentPage, setSyncCurrentPage] = useState(0); // get value when we click on pagination (always gives one less value like if  we click 2 so it gives 1 ans so on)
  const limit = 6;

  // fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await _get(
        `/product/get?page=${currentPage}&limit=${limit}`
      );
      if (response.data.success === true) {
        setData(response.data);
        setTotalPageCount(response.data.totalPages);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    setCallProducts(false);
  }, [callProducts, currentPage]);

  // 🔹 Handle page click
  const handlePageClick = (event) => {
    setSyncCurrentPage(event.selected); // orginal value (less value always)
    setCurrentPage(event.selected + 1); // increase value when we get
  };
  return (
    <>
      <div className="p-4">
        <div className="text-end">
          <Button onClick={() => setIsOpen(true)}>Add new product</Button>

          <ProductSlider />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
            {data.data?.length > 0 ? (
              <>
                {data.data?.map((v, i) => (
                  <ProductCard items={v} key={i} />
                ))}

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
              <p className="text-center">No product found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
