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

export default function ProductSlider({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] gap-0">
        <SheetHeader>
          <SheetTitle>Add new product</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="p-5 pt-2 overflow-auto">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture">Upload Image</Label>
            <Input id="picture" type="file" />

            <Label htmlFor="title" className="mt-3">
              Title
            </Label>
            <Input id="title" type="text" placeholder="enter product title" />

            <Label htmlFor="title" className="mt-3">
              Description
            </Label>
            <Textarea placeholder="Enter product description" />

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
            />

            <Label htmlFor="salePrice" className="mt-3">
              Sale Price
            </Label>
            <Input id="salePrice" type="text" placeholder="enter sale price" />

            <Label htmlFor="totalStock" className="mt-3">
              Total Stock
            </Label>
            <Input
              id="totalStock"
              type="number"
              placeholder="enter total stock"
            />

            <Button className="mb-10">Add</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
