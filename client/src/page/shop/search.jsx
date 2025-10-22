import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { _get } from "../../lib/api";
import { LoaderIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../../components/product-list";
import LoadingSpinner from "../../components/loding";

export default function SearchProduct() {
  const [isProductSearch, setIsProductSearch] = useState("");
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await _get(`search/${isProductSearch}`);
      if (res.status === 200) {
        setProductData(res);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isProductSearch) {
      fetchProducts();
    }
  }, [isProductSearch]);
  return (
    <>
      <div className="container mx-auto p-5">
        <input
          type="text"
          placeholder="Search Product..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const value = e.target.value;
            setIsProductSearch(value);

            if (value.trim()) {
              setSearchParams({ keyword: e.target.value });
            } else {
              setSearchParams({});
            }
          }}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : productData?.data?.data.length > 0 && isProductSearch ? (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {productData?.data?.data?.map((v, index) => (
              <ProductList item={v} />
            ))}
          </div>
        ) : (
          <p className="font-extrabold mt-5">No Result Found!</p>
        )}
      </div>
    </>
  );
}
