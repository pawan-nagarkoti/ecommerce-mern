import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// utils/formatDate.js
export const formatDate = (isoDate) => {
  if (!isoDate) return;
  const date = new Date(isoDate);

  const options = {
    year: "numeric",
    month: "long", // 'short' for "Oct"
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
