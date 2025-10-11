import React from "react";
import { useNavigate } from "react-router-dom";
import { _post } from "../lib/api";

export default function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const logoutUser = await _post("auth/logout");
      if (logoutUser?.data?.success) {
        navigate("/");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return logout;
}
