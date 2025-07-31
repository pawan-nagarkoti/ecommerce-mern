import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";

export const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const category = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "accessories", label: "Accessories" },
  { id: "footwear", label: "Footwear" },
];

export const brand = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "puma", label: "Puma" },
  { id: "levi", label: "Levi's" },
  { id: "zara", label: "Zara" },
  { id: "h&m", label: "H&M" },
];

export const shopByCategory = {
  title: "Shop by category",
  items: [
    { label: "Men", icon: ShirtIcon },
    { label: "Women", icon: CloudLightning },
    { label: "Kids", icon: BabyIcon },
    { label: "Accessories", icon: WatchIcon },
    { label: "Footwear", icon: UmbrellaIcon },
  ],
};

export const shopByBrand = {
  title: "Shop by brand",
  items: [
    { label: "Nike", icon: Shirt },
    { label: "Adidas", icon: WashingMachine },
    { label: "Puma", icon: ShoppingBasket },
    { label: "Levi's", icon: Airplay },
    { label: "Zara", icon: Images },
    { label: "H&M", icon: Heater },
  ],
};
