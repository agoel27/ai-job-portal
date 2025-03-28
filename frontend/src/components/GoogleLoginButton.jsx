import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSuccess = async (response) => {
    try {
      const csrfToken = Cookies.get("csrftoken");

      const res = await axios.post(
        "http://127.0.0.1:8000/auth/google/",
        {
          credential: response.credential,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("name", res.data.name);

      navigate("/");
    } catch (error) {
      if (
        error.response.data.error ===
        "An account with this email already exists. Please log in using your password."
      ) {
        alert(
          "An account with this email already exists. Please log in using your password.",
        );
      } else {
        alert(
          "Error: " + (error.response.data.error || "Something went wrong."),
        );
      }
    }
  };

  const handleFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
