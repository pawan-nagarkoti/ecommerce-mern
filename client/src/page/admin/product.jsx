import { Button } from "@/components/ui/button";
import ProductCard from "../../components/product-card";
import ProductSlider from "./product-slider";
import { useEffect, useState } from "react";
import { _get } from "../../lib/api";
import { data } from "react-router-dom";
import useUI from "../../contexts/UIContext";

export default function Product() {
  const [data, setData] = useState([]);
  const { callProducts, setCallProducts } = useUI();
  const { setIsOpen } = useUI();

  // fetch products
  const fetchProducts = async () => {
    try {
      const response = await _get("/product/get");
      if (response.data.success === true) {
        setData(response.data);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
    }
  };
  useEffect(() => {
    fetchProducts();
    setCallProducts(false);
  }, [callProducts]);
  return (
    <>
      <div className="p-4">
        <div className="text-end">
          <Button onClick={() => setIsOpen(true)}>Add new product</Button>

          <ProductSlider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
          {data.data?.length > 0 ? (
            data.data?.map((v, i) => <ProductCard items={v} key={i} />)
          ) : (
            <p className="text-center">No product found</p>
          )}
        </div>
      </div>
    </>
  );
}
