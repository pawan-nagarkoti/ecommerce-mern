import { useEffect } from "react";
import useCookie from "../hooks/useCookie";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const navigate = useNavigate();
  const { getCookie } = useCookie();
  const user = getCookie("loginUserInfo");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (roles && !roles.includes(user.role)) {
      navigate("/unauthorized");
    }
  }, [user, roles, navigate]);

  // Don’t render children until navigation checks are done
  if (!user || (roles && !roles.includes(user.role))) {
    return null;
  }

  return children;
}
