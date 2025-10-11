import { useCookies } from "react-cookie";

export default function useCookie() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const getCookie = (key) => {
    return cookies[key];
  };
  const addCookie = (key, value) => {
    setCookie(key, value);
  };
  const deleteCookie = (value) => {
    removeCookie(value);
  };

  return {
    getCookie,
    addCookie,
    deleteCookie,
  };
}
