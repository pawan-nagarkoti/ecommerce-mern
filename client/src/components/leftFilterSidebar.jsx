import { useEffect, useState } from "react";
import { brand, category } from "../lib/constant";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Helper to get list from URL query
const getQueryList = (params, key) => {
  const value = params.get(key);
  return value ? value.split(",").filter(Boolean) : [];
};

// Helper to set list into URL query
const updateQueryList = (params, key, values) => {
  const newParams = new URLSearchParams(params);
  if (values.length === 0) {
    newParams.delete(key);
  } else {
    newParams.set(key, values.join(","));
  }
  return newParams;
};

export default function LeftFilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected filters from URL
  const [selectedCategories, setSelectedCategories] = useState(() =>
    getQueryList(searchParams, "category")
  );
  const [selectedBrands, setSelectedBrands] = useState(() =>
    getQueryList(searchParams, "brand")
  );

  // Sync selected filters to URL
  useEffect(() => {
    let updatedParams = updateQueryList(
      searchParams,
      "category",
      selectedCategories
    );
    updatedParams = updateQueryList(updatedParams, "brand", selectedBrands);
    setSearchParams(updatedParams);
  }, [selectedCategories, selectedBrands, searchParams, setSearchParams]);

  // Add or remove item from array
  const handleToggle = (array, item, isChecked) => {
    if (isChecked) {
      // Add if not already in array
      return array.includes(item) ? array : [...array, item];
    } else {
      // Remove from array
      return array.filter((val) => val !== item);
    }
  };
  // reset filter
  const handleResetFilter = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  return (
    <div>
      <h2 className="font-extrabold mb-3">Filters</h2>

      {/* Category Filters */}
      <h3 className="font-bold mt-10 mb-3">Category</h3>
      <ul>
        {category.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Checkbox
              checked={selectedCategories.includes(item.label)}
              onCheckedChange={(checked) =>
                setSelectedCategories((prev) =>
                  handleToggle(prev, item.label, !!checked)
                )
              }
            />
            {item.label}
          </li>
        ))}
      </ul>

      {/* Brand Filters */}
      <h3 className="font-bold mt-10 mb-3">Brand</h3>
      <ul>
        {brand.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <Checkbox
              checked={selectedBrands.includes(item.label)}
              onCheckedChange={(checked) =>
                setSelectedBrands((prev) =>
                  handleToggle(prev, item.label, !!checked)
                )
              }
            />
            {item.label}
          </li>
        ))}
      </ul>

      <Button size="sm" className="mt-3" onClick={handleResetFilter}>
        Reset
      </Button>
    </div>
  );
}
