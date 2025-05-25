import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function AdminProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) return setIsAuthorized(false);

      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          await refreshToken();
        } else {
          checkIsStaff(decoded);
        }
      } catch (err) {
        console.error("Token decoding error:", err);
        setIsAuthorized(false);
      }
    };

    checkAuth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", { refresh });
      if (res.status === 200) {
        const newToken = res.data.access;
        localStorage.setItem(ACCESS_TOKEN, newToken);
        const decoded = jwtDecode(newToken);
        checkIsStaff(decoded);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      console.error("Refresh failed:", err);
      setIsAuthorized(false);
    }
  };

  const checkIsStaff = (decoded) => {
    console.log(decoded);
    if (decoded.is_staff) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/unauthorized" />;
}

export default AdminProtectedRoute;
