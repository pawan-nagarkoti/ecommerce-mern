import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dropdown } from "../../components/dropdown";
import { brand, category } from "../../lib/constant";
import { useState } from "react";
import useUI from "../../contexts/UIContext";
import { _get, _post } from "../../lib/api";

export default function ProductSlider({ open, onOpenChange }) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setCallProducts, categoryValue, brandValue } = useUI();

  // add products
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const v = new FormData();
    v.append("image", image);
    v.append("title", title);
    v.append("description", description);
    v.append("price", price);
    v.append("salePrice", salePrice);
    v.append("totalStock", totalStock);
    v.append("category", categoryValue);
    v.append("brand", brandValue);

    try {
      setIsLoading(true);
      const res = await _post("product/add", v);

      if (res?.data?.success) {
        setCallProducts(true); // fetch all product
        // close the sheet
        onOpenChange(false);

        // reset fields
        setImage("");
        setTitle("");
        setDescription("");
        setPrice("");
        setSalePrice("");
        setTotalStock("");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] gap-0">
        <SheetHeader>
          <SheetTitle>Add new product</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="p-5 pt-2 overflow-auto">
          <form onSubmit={handleProductSubmit}>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="picture">Upload Image</Label>
              <Input
                id="picture"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <Label htmlFor="title" className="mt-3">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="enter product title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Label htmlFor="description" className="mt-3">
                Description
              </Label>
              <Textarea
                placeholder="Enter product description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Label htmlFor="title" className="mt-3">
                Category
              </Label>
              <Dropdown data={category} />

              <Label htmlFor="title" className="mt-3">
                Brand
              </Label>
              <Dropdown data={brand} />

              <Label htmlFor="productPrice" className="mt-3">
                Price
              </Label>
              <Input
                id="productPrice"
                type="text"
                placeholder="enter product price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <Label htmlFor="salePrice" className="mt-3">
                Sale Price
              </Label>
              <Input
                id="salePrice"
                type="text"
                placeholder="enter sale price"
                name="salesPrice"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />

              <Label htmlFor="totalStock" className="mt-3">
                Total Stock
              </Label>
              <Input
                id="totalStock"
                type="number"
                placeholder="enter total stock"
                name="totalStock"
                value={totalStock}
                onChange={(e) => setTotalStock(e.target.value)}
              />

              <Button type="submit" disabled={isLoading}>
                Add
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
