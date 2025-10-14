import React, { useEffect, useState } from "react";
import { StatCard } from "../../components/statCard";
// lightweight inline icons (no extra deps)
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
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    totalSold: 0,
    // optional: percentage changes for pretty deltas
    delta: { products: 0, reviews: 0, sold: 0 },
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Adjust this endpoint to your backend
        const res = await fetch("/api/dashboard-stats");
        if (!res.ok) throw new Error("Failed to load stats");
        const data = await res.json();

        // expected shape:
        // {
        //   totalProducts: number,
        //   totalReviews: number,
        //   totalSold: number,
        //   delta: { products: number, reviews: number, sold: number },
        //   recentSales: [{ id, productName, qty, amount, date }]
        // }

        setStats({
          totalProducts: data.totalProducts,
          totalReviews: data.totalReviews,
          totalSold: data.totalSold,
          delta: data.delta || { products: 0, reviews: 0, sold: 0 },
        });
        setRecent(data.recentSales || []);
      } catch (e) {
        // fallback demo data so the page still looks good
        setStats({
          totalProducts: 1280,
          totalReviews: 3421,
          totalSold: 8749,
          delta: { products: 2.1, reviews: 5.6, sold: 3.4 },
        });
        setRecent([
          {
            id: "o-10021",
            productName: "Wireless Earbuds Pro",
            qty: 2,
            amount: 119.98,
            date: "2025-10-12",
          },
          {
            id: "o-10020",
            productName: "Smartwatch S3",
            qty: 1,
            amount: 199.99,
            date: "2025-10-12",
          },
          {
            id: "o-10019",
            productName: "4K Monitor 27”",
            qty: 1,
            amount: 329.0,
            date: "2025-10-11",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-zinc-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
              Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
                Export
              </button>
              <button className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800">
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats grid */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            label="Total Products"
            value={loading ? 0 : stats.totalProducts}
            icon={<BoxIcon />}
            delta={stats.delta.products}
            deltaLabel="vs last 7 days"
            accent="sky"
          />
          <StatCard
            label="Total Reviews"
            value={loading ? 0 : stats.totalReviews}
            icon={<StarIcon />}
            delta={stats.delta.reviews}
            deltaLabel="vs last 7 days"
            accent="amber"
          />
          <StatCard
            label="Total Sold"
            value={loading ? 0 : stats.totalSold}
            icon={<CartIcon />}
            delta={stats.delta.sold}
            deltaLabel="vs last 7 days"
            accent="emerald"
          />
        </section>

        {/* Recent activity */}
        <section className="mt-8">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-900">
                Recent Sales
              </h2>
              <span className="text-xs text-zinc-500">Last updates</span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 text-sm">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-zinc-600">
                      Order ID
                    </th>
                    <th className="px-4 py-2 text-left font-medium text-zinc-600">
                      Product
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-zinc-600">
                      Qty
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-zinc-600">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-right font-medium text-zinc-600">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {loading
                    ? // simple skeleton rows
                      Array.from({ length: 3 }).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td className="px-4 py-3">
                            <div className="h-4 w-24 rounded bg-zinc-200" />
                          </td>
                          <td className="px-4 py-3">
                            <div className="h-4 w-48 rounded bg-zinc-200" />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="ml-auto h-4 w-6 rounded bg-zinc-200" />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="ml-auto h-4 w-16 rounded bg-zinc-200" />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="ml-auto h-4 w-20 rounded bg-zinc-200" />
                          </td>
                        </tr>
                      ))
                    : recent.map((r) => (
                        <tr key={r.id}>
                          <td className="px-4 py-3 font-medium text-zinc-800">
                            {r.id}
                          </td>
                          <td className="px-4 py-3 text-zinc-700">
                            {r.productName}
                          </td>
                          <td className="px-4 py-3 text-right text-zinc-700">
                            {r.qty}
                          </td>
                          <td className="px-4 py-3 text-right text-zinc-700">
                            {Intl.NumberFormat(undefined, {
                              style: "currency",
                              currency: "USD",
                            }).format(r.amount)}
                          </td>
                          <td className="px-4 py-3 text-right text-zinc-500">
                            {new Date(r.date).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
