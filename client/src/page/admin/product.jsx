import { Button } from "@/components/ui/button";
import ProductCard from "../../components/product-card";
import ProductSlider from "./product-slider";
import { useState } from "react";

export default function Product() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="p-4">
        <div className="text-end">
          <Button onClick={() => setIsOpen(true)}>Add new product</Button>

          <ProductSlider open={isOpen} onOpenChange={setIsOpen} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
          {Array.from({ length: 10 }, () => (
            <ProductCard />
          ))}
        </div>
      </div>
    </>
  );
}
