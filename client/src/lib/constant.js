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
  { id: "men", value: "Men", label: "Men" },
  { id: "women", value: "Women", label: "Women" },
  { id: "kids", value: "Kids", label: "Kids" },
  { id: "accessories", value: "Accessories", label: "Accessories" },
  { id: "footwear", value: "Footwear", label: "Footwear" },
];

export const brand = [
  { id: "nike", value: "Nike", label: "Nike", name: "brand" },
  { id: "adidas", value: "Adidas", label: "Adidas", name: "brand" },
  { id: "puma", value: "Puma", label: "Puma", name: "brand" },
  { id: "levi", value: "Levi's", label: "Levi's", name: "brand" },
  { id: "zara", value: "Zara", label: "Zara", name: "brand" },
  { id: "h&m", value: "H&M", label: "H&M", name: "brand" },
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

export const orderStatusList = [
  {
    statusName: "Pending",
    colorName: "gray",
  },
  {
    statusName: "Processing",
    colorName: "blue",
  },
  {
    statusName: "Shipped",
    colorName: "purple",
  },
  {
    statusName: "OutForDelivery",
    colorName: "orange",
  },
  {
    statusName: "Delivered",
    colorName: "green",
  },
  {
    statusName: "Cancelled",
    colorName: "red",
  },
  {
    statusName: "Returned",
    colorName: "amber",
  },
  {
    statusName: "Refunded",
    colorName: "teal",
  },
  {
    statusName: "Failed",
    colorName: "darkred",
  },
];
