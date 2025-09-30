import { useEffect, useState } from "react";
import { Slider } from "../../components/Slider";
import FilterTag from "../../components/filterTag";
import ProductList from "../../components/product-list";
import { shopByBrand, shopByCategory } from "../../lib/constant";
import { _get } from "../../lib/api";

export default function Home() {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);

  // fetch feature image
  const fetchFeatureImage = async () => {
    try {
      const res = await _get("feature/get");
      if (res.status === 200) {
        setData(res ?? []);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // fetch all products
  const fetchProduct = async () => {
    try {
      const res = await _get(`product/get`);
      if (res.data.success) {
        setProductData(res.data);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
    }
  };
  useEffect(() => {
    fetchFeatureImage();
    fetchProduct();
  }, []);

  return (
    <>
      {data?.data?.data?.length > 0 ? (
        <Slider items={data?.data?.data} />
      ) : (
        <p>No feature image found.</p>
      )}
      <div className="container m-auto">
        <div className="my-20">
          <FilterTag {...shopByCategory} tagname="category" />
        </div>

        <div className="my-20">
          <FilterTag {...shopByBrand} tagname="brand" />
        </div>

        <div className="my-20">
          <h2 className="text-center text-2xl mb-5">Feature Products</h2>

          <div className="grid gird-cols-1 md:grid-cols-4 gap-5">
            {productData?.data?.length > 0 ? (
              productData.data.map((v, i) => <ProductList item={v} key={i} />)
            ) : (
              <p className="text-center">Product not found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
