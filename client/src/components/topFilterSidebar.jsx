import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

export default function TopFilterSidebar({ totalItem = [], onSortChange }) {
  const [dropdownValue, setDropdownValue] = useState("price-lowToHigh");

  const handleSort = (value) => {
    setDropdownValue(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  return (
    <div className="flex justify-between">
      <h2 className="font-bold">All Products</h2>
      <div className="flex gap-3 items-center">
        <p className="text-sm">{totalItem.length} Products</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ArrowUpDown /> Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => handleSort("price-lowToHigh")}
                style={{
                  background:
                    dropdownValue === "price-lowToHigh" ? "black" : undefined,
                  color:
                    dropdownValue === "price-lowToHigh" ? "white" : undefined,
                }}
              >
                Price: Low to High
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSort("price-highToLow")}
                style={{
                  background:
                    dropdownValue === "price-highToLow" ? "black" : undefined,
                  color:
                    dropdownValue === "price-highToLow" ? "white" : undefined,
                }}
              >
                Price: High to Low
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSort("title-aToz")}
                style={{
                  background:
                    dropdownValue === "title-aToz" ? "black" : undefined,
                  color: dropdownValue === "title-aToz" ? "white" : undefined,
                }}
              >
                Title: A to Z<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => handleSort("title-zToa")}
                style={{
                  background:
                    dropdownValue === "title-zToa" ? "black" : undefined,
                  color: dropdownValue === "title-zToa" ? "white" : undefined,
                }}
              >
                Title: Z to A<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
