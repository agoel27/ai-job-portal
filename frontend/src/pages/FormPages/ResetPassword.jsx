import React, { useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/reset-password/${uid}/${token}/`, {
        password,
      });

      alert(response.data.message || "Password reset successful.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Error resetting password.");
      } else if (error.request) {
        alert("Server did not respond. Please try again.");
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center bg-white p-5 rounded-[15px] shadow-md lg:max-w-1/4 md:max-w-1/2 max-w-2/3 mx-auto"
    >
      <p className="form-title">Reset Password</p>
      <div className="input-name">New Password</div>
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
      <div className="input-name">Confirm Password</div>
      <input
        className="form-input"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        required
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
