import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post(`/reset-password/${uid}/${token}/`, {
        password,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
      alert(error);
    }
    setLoading(false);
  };

  return (
    <div className="text-center pt-8">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
