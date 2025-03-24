import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        console.log("Token expiration:", new Date(tokenExpiration * 1000));
        console.log("Current time:", new Date(now * 1000));

        if (tokenExpiration < now) {
          console.log("Token expired, refreshing...");
          await refreshToken();
        } else {
          console.log("Token is valid");
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        setIsAuthorized(false);
      }
    };

    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
        console.log("Token refreshed successfully");
      } else {
        console.error("Failed to refresh token:", res.data);
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Refresh token failed:", error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
