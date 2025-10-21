import React, { useEffect, useState } from "react";
import { StatCard } from "../../components/statCard";
import { _get } from "../../lib/api";

const BoxIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 16V8a2 2 0 0 0-1-1.732l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 2 8v8a2 2 0 0 0 1 1.732l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.3 7.7 12 12l8.7-4.3M12 22V12"
    />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M11.48 3.5a1 1 0 0 1 1.04 0l3.02 1.86a1 1 0 0 0 .72.13l3.51-.7a1 1 0 0 1 1.18 1.18l-.7 3.51a1 1 0 0 0 .13.72l1.86 3.02a1 1 0 0 1-0 1.04l-1.86 3.02a1 1 0 0 0-.13.72l.7 3.51a1 1 0 0 1-1.18 1.18l-3.51-.7a1 1 0 0 0-.72.13L12.52 22a1 1 0 0 1-1.04 0l-3.02-1.86a1 1 0 0 0-.72-.13l-3.51.7a1 1 0 0 1-1.18-1.18l.7-3.51a1 1 0 0 0-.13-.72L.96 13.48a1 1 0 0 1 0-1.04l1.86-3.02a1 1 0 0 0 .13-.72l-.7-3.51A1 1 0 0 1 3.43 3l3.51.7a1 1 0 0 0 .72-.13L11.48 3.5Z" />
  </svg>
);
const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13l-2.2-8M7 13l-1.5 5.5M17 13l1.5 5.5M6 21h.01M18 21h.01"
    />
  </svg>
);

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await _get("dashboard/stats");
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="min-h-screen">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          label="Total Products"
          value={loading ? 0 : data.totalProducts}
          icon={<BoxIcon />}
          accent="sky"
        />
        <StatCard
          label="Total Reviews"
          value={loading ? 0 : data.totalReview}
          icon={<StarIcon />}
          accent="amber"
        />
        <StatCard
          label="Total Sold Products"
          value={loading ? 0 : data.totalSoldProducts}
          icon={<CartIcon />}
          accent="emerald"
        />
      </section>
    </div>
  );
}
