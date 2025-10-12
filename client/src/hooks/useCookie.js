import { useCookies } from "react-cookie";

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
