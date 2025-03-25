import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method, title }) {
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
      // Register or log in the user
      const res = await api.post(route, { email, password });
      console.log("Response:", res.data);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("name", email);

        // Check verification status
        const verifiedRes = await api.get("/api/check-verified/", {
          headers: { Authorization: `Bearer ${res.data.access}` },
        });

        console.log("Verified response:", verifiedRes.data);

        if (!verifiedRes.data.verified) {
          // If not verified, remove tokens and show alert
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          localStorage.removeItem("name");

          alert("Your account is not verified. Please check your email.");
          setLoading(false);
          return;
        }

        // If verified, navigate to the homepage
        navigate("/");
      } else {
        // Send verification email
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
        alert("Error: Bad Tokens");

        if (error.response.data.email) {
          alert(error.response.data.email.join(" "));
          alert(
            error.response.data.detail || JSON.stringify(error.response.data),
          );
        }
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
    <>
      {method === "register" && (
        <form onSubmit={handleSubmit} className="form-container">
          <p className="form-title">{title}</p>
          <input
            className="form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {loading && <LoadingIndicator />}
          <button className="form-button" type="submit">
            {name}
          </button>
          <p className="signup-text">
            Already have an account?{" "}
            <a href="/login" className="signup-link">
              Log in
            </a>
          </p>
        </form>
      )}
      {method === "login" && (
        <form onSubmit={handleSubmit} className="form-container">
          <p className="form-title">{title}</p>
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
          {loading && <LoadingIndicator />}
          <button className="form-button" type="submit">
            {name}
          </button>
          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </div>
          <p className="signup-text">
            New to 1.800 Help?{" "}
            <a href="/register" className="signup-link">
              Sign Up Here
            </a>
          </p>
        </form>
      )}
    </>
  );
}

export default Form;
