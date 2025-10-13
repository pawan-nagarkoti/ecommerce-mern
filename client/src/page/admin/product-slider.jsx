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
import { useEffect, useState } from "react";
import useUI from "../../contexts/UIContext";
import { _get, _post, _put } from "../../lib/api";
import { Switch } from "@/components/ui/switch";

export default function ProductSlider() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewImage, setISPreviewImage] = useState("");
  const [data, setData] = useState("");
  const [isFeatureProduct, setIsFeatureProduct] = useState(false);

  const {
    setCallProducts,
    categoryValue,
    brandValue,
    isOpen,
    setIsOpen,
    hasEditPrductBtnClicked,
    isProductId,
    setIsProductId,
    setHasEditProductBtnClicked,
  } = useUI();

  // add products
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const v = new FormData();
    v.append("image", image ? image : data.image);
    v.append("title", title);
    v.append("description", description);
    v.append("price", price);
    v.append("salePrice", salePrice);
    v.append("stock", totalStock);
    v.append("category", categoryValue ? categoryValue : data.category);
    v.append("brand", brandValue ? brandValue : data.brand);
    v.append("featureProduct", isFeatureProduct);

    try {
      setIsLoading(true);
      const res = data._id
        ? await _put(`product/update?id=${data._id}`, v)
        : await _post("product/add", v);

      if (res?.data?.success) {
        // reset fields
        setImage("");
        setTitle("");
        setDescription("");
        setPrice("");
        setSalePrice("");
        setTotalStock("");
        setData("");
        setISPreviewImage("");
        setCallProducts(true); // fetch all product
        setIsProductId("");
        // close the sheet
        setIsOpen(false);
        setHasEditProductBtnClicked(false);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch single product
  const fetchSingleProduct = async () => {
    try {
      const response = await _get(`product/single?id=${isProductId}`);
      const r = response.data.data;
      setData(r);
      setTitle(r.title ?? "");
      setDescription(r.description ?? "");
      setPrice(r.price ?? "");
      setSalePrice(r.salePrice ?? "");
      setTotalStock(r.stock ?? "");
      setISPreviewImage(r.image);
      setIsFeatureProduct(r.featureProduct);
    } catch (e) {
      console.log(e.message);
    } finally {
    }
  };
  useEffect(() => {
    if (hasEditPrductBtnClicked) {
      fetchSingleProduct();
    }
  }, [hasEditPrductBtnClicked]);

  useEffect(() => {
    if (!isOpen) {
      setImage("");
      setTitle("");
      setDescription("");
      setPrice("");
      setSalePrice("");
      setTotalStock("");
      setData("");
      setISPreviewImage("");
      setCallProducts(true); // fetch all product
      setIsProductId("");
      setIsOpen(false);
      setHasEditProductBtnClicked(false);
      setIsFeatureProduct(false);
    }
  }, [isOpen]);

  return (
    // <Sheet open={open} onOpenChange={onOpenChange}>
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImage(file);
                  if (file) {
                    setISPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />

              {/* preview image */}
              {isPreviewImage && (
                <img
                  src={isPreviewImage || ""}
                  alt=""
                  className="h-[200px] w-full"
                />
              )}

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
              <Dropdown data={category} selectedValue={data?.category} />

              <Label htmlFor="title" className="mt-3">
                Brand
              </Label>
              <Dropdown data={brand} selectedValue={data?.brand} />

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

              <Label htmlFor="totalStock" className="mt-3">
                Feature Product
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="airplane-mode"
                  onCheckedChange={() => setIsFeatureProduct((prev) => !prev)}
                  checked={isFeatureProduct ? true : false}
                />
                <Label htmlFor="airplane-mode">
                  {isFeatureProduct ? "yes" : "no"}
                </Label>
              </div>

              <Button type="submit" disabled={isLoading}>
                {isProductId ? "Edit" : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
