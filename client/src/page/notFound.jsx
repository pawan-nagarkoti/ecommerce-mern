import useLogout from "../hooks/useLogout";

export default function NotFound() {
  const logout = useLogout();

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-6 text-center">
      {/* Icon / Illustration */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
        <svg
          className="h-10 w-10 text-indigo-600 dark:text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="mt-3 max-w-md text-gray-600 dark:text-gray-300">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={logout}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          Go to Homepage
        </button>

        <button
          onClick={logout}
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-900 ring-1 ring-gray-200 shadow hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
        >
          Contact Support
        </button>
      </div>

      {/* Optional small footer */}
      <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
        Error Code: 404
      </p>
    </main>
  );
}
