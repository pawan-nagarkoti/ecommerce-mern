import { Slider } from "../../components/Slider";
import FilterTag from "../../components/filterTag";
import ProductList from "../../components/product-list";
import { shopByBrand, shopByCategory } from "../../lib/constant";

export default function Home() {
  return (
    <>
      <Slider />
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
