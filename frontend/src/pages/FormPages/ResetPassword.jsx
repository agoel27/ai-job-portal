import React, { useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/reset-password/${uid}/${token}/`, {
        password,
      });

      setStatus("success");
      setMessage(response.data.message || "Password reset successful.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setStatus("error");
      if (error.response) {
        if (error.response.data.message) {
          setMessage(error.response.data.message);
        } else if (error.response.data.password) {
          // Handle password validation errors from backend
          setMessage(error.response.data.password.join(" "));
        } else {
          setMessage("Error resetting password. Please try again.");
        }
      } else if (error.request) {
        setMessage("Server did not respond. Please try again.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white p-5 rounded-[15px] shadow-md lg:max-w-1/4 md:max-w-1/2 max-w-2/3 mx-auto"
      >
        <p className="form-title">Reset Password</p>

        {status && (
          <div
            className={`mb-4 p-3 rounded ${status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {message}
            {status === "success" && (
              <p className="mt-2">Redirecting to login...</p>
            )}
          </div>
        )}

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

        {isLoading && <LoadingIndicator />}

        <button className="form-button" type="submit" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
