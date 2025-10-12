import { useNavigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";

export default function Unauthorized() {
  const { getCookie } = useCookie();
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    if (getCookie("accessToken")) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-6 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
        <svg
          className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2V9a6 6 0 10-12 0v2a2 2 0 00-2 2v6a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Unauthorized Access
      </h1>

      {/* Description */}
      <p className="mt-3 max-w-md text-gray-600 dark:text-gray-300">
        Sorry, you don’t have permission to view this page. Please sign in or
        return to the home page.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={redirectToLoginPage}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          Go to Login
        </button>

        <button
          onClick={redirectToLoginPage}
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-900 ring-1 ring-gray-200 shadow hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
        >
          Go Home
        </button>
      </div>

      {/* Optional small footer */}
      <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
        If you believe this is an error, please contact support.
      </p>
    </main>
  );
}
