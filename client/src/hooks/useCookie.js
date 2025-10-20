import { useCookies, Cookies } from "react-cookie";

export default function useCookie() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const getCookie = (key) => cookies[key];

  const addCookie = (key, value, options = { path: "/" }) => {
    setCookie(key, value, options);
  };

  const deleteCookie = (key, options = { path: "/" }) => {
    removeCookie(key, options);
  };

  return {
    getCookie,
    addCookie,
    deleteCookie,
  };
}

// Export helper instance for non-React usage
export const cookies = new Cookies();
export const getCookie = (key) => cookies.get(key);
export const addCookie = (key, value, options = { path: "/" }) =>
  cookies.set(key, value, options);
export const deleteCookie = (key, options = { path: "/" }) =>
  cookies.remove(key, options);
