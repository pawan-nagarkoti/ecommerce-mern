import { useEffect, useState } from "react";
import { Slider } from "../../components/Slider";
import FilterTag from "../../components/filterTag";
import ProductList from "../../components/product-list";
import { shopByBrand, shopByCategory } from "../../lib/constant";
import { _get } from "../../lib/api";

export default function Home() {
  const [data, setData] = useState([]);

  // fetch feature image
  const fetchFeatureImage = async () => {
    try {
      const res = await _get("feature/get");
      if (res.status === 200) {
        setData(res);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchFeatureImage();
  }, []);

  return (
    <>
      {data?.data?.data.length > 0 && <Slider items={data?.data?.data} />}
      <div className="container m-auto">
        <div className="my-20">
          <FilterTag {...shopByCategory} />
        </div>

        <div className="my-20">
          <FilterTag {...shopByBrand} />
        </div>

        <div className="my-20">
          <h2 className="text-center text-2xl mb-5">Feature Products</h2>

          <div className="grid grid-cols-4 gap-5">
            {Array.from({ length: 10 }, () => (
              <ProductList />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
