import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/forgot-password/", { email });
      if (response.data.status === "success") {
        localStorage.setItem("email", email);
        navigate("/email-sent"); // Or a specific password reset email sent page
      } else {
        setMessage(response.data.message || "Failed to send reset link");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Error sending reset link. Please try again.",
      );
    }
    setLoading(false);
  };

  return (
    <div className="text-center pt-8">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
