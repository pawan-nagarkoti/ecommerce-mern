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

export function SheetDemo({ setIsOpenCart, isOpenCart }) {
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

        <div class="px-5 py-4 space-y-6">
          <div class="flex items-start gap-3">
            <img
              src="https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=240"
              alt="Kids Tshirt"
              class="h-16 w-16 rounded-md object-cover ring-1 ring-gray-200"
            />

            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <p class="font-semibold leading-5">Kids Tshirt</p>
                </div>
                <p class="text-sm font-medium text-gray-800">$1250.00</p>
              </div>

              <div class="mt-2 flex items-center gap-3">
                <div class="inline-flex items-center rounded border border-gray-200">
                  <button
                    class="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span class="px-3 text-sm select-none">5</span>
                  <button
                    class="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                <button
                  class="ml-auto p-2 rounded hover:bg-gray-100"
                  aria-label="Remove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3 6h18M8 6v-.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V6m-8 0h8m-9 3 1 10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-10M10 11v7m4-7v7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between border-t pt-4">
            <span class="font-semibold">Total</span>
            <span class="font-semibold">$1250</span>
          </div>

          <button class="w-full rounded-md bg-black px-4 py-3 text-white font-medium hover:opacity-90">
            Checkout
          </button>
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
