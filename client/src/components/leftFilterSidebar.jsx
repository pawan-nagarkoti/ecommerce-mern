import React from "react";
import { brand, category } from "../lib/constant";
import { Checkbox } from "@/components/ui/checkbox";

export default function LeftFilterSidebar() {
  return (
    <>
      <h2 className="font-extrabold mb-3">Filters</h2>

      <h3 className="font-bold mt-10 mb-3">Category</h3>
      {category.map((v, i) => (
        <ul>
          <li className="flex items-center gap-2">
            <Checkbox />
            {v.label}
          </li>
        </ul>
      ))}

      <h3 className="font-bold mt-10 mb-3">Brand</h3>
      {brand.map((v, i) => (
        <ul>
          <li className="flex items-center gap-2">
            <Checkbox />
            {v.label}
          </li>
        </ul>
      ))}
    </>
  );
}
