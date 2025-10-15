import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "../page/shop/cart";
import useUI from "../contexts/UIContext";

export function SheetDemo() {
  const { isOpenCart, setIsOpenCart } = useUI();

  return (
    <Sheet open={isOpenCart} onOpenChange={setIsOpenCart}>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="overflow-auto">
          <Cart />
        </div>

        <SheetFooter>
          {/* <Button type="submit">Save changes</Button> */}
          <SheetClose asChild>
            {/* <Button variant="outline">Close</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
