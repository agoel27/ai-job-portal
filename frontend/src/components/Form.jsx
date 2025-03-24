import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Form({ route, method }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Log In" : "Register";
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Step 1: Register or log in the user
      const res = await api.post(route, { email, password });
      console.log("Response:", res.data.verified);

      if (method === "login") {
        if (res.data.verified) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          localStorage.setItem("name", email);
          navigate("/");
        } else {
          alert(
            "Your account is not verified. Please check your email for verification instructions.",
          );
        }
      } else {
        const emailResponse = await api.post("/send-registration-email/", {
          email: email,
        });

        if (emailResponse.data.status === "success") {
          localStorage.setItem("email", email);
          navigate("/email-sent");
        } else {
          alert("Failed to send registration email. Please try again.");
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        alert(
          error.response.data.detail || JSON.stringify(error.response.data),
        );
      } else if (error.request) {
        console.error("No response from server:", error.request);
        alert("Server did not respond. Please try again.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Welcome!</h2>
      <h1>{name}</h1>
      <div className="input-name">Email</div>
      <input
        className="form-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="input-name">Password</div>
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {method === "login" && (
        <>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <div className="form-extras">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
          </div>
        </>
      )}

      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>
      <div className="divider">
        <span className="divider-line"></span>
        <span className="divider-text">or</span>
        <span className="divider-line"></span>
      </div>
      <div className="google-button">
        <GoogleLoginButton />
      </div>
      {method === "login" && (
        <>
          <p className="signup-text">
            New to 1.800 Help?{" "}
            <a href="/register" className="signup-link">
              Sign Up Here
            </a>
          </p>
        </>
      )}
    </form>
  );
}

export default Form;
