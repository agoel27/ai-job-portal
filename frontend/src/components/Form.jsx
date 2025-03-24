import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method, title }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Log In" : "Register";
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("name", username);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {method === "register" && 
        <form onSubmit={handleSubmit} className="form-container">
          <p className="form-title">{title}</p>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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
        </form>
      }
      {method === "login" &&
        <form onSubmit={handleSubmit} className="form-container">
          <p className="form-title">{title}</p>
          <h1>{name}</h1>
          <div className="input-name">Email or Username</div>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button className="google-button">Continue with Google</button>
          <p className="signup-text">
            New to 1.800 Help?{" "}
            <a href="#" className="signup-link">
              Sign Up Here
            </a>
          </p>
        </form>
      }
    </>
  );
}

export default Form;