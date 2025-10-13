import { useNavigate } from "react-router-dom";
import { _post } from "../lib/api";
import useCookie from "./useCookie";

export default function useLogout() {
  const navigate = useNavigate();
  const { deleteCookie } = useCookie();

  const logout = async () => {
    try {
      const logoutUser = await _post("auth/logout");
      if (logoutUser?.data?.success) {
        deleteCookie("accessToken");
        deleteCookie("loginUserInfo");
        deleteCookie("otpEmail");
        navigate("/login");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return logout;
}
