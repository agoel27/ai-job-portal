import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import "../../styles/Form.css";
import LoadingIndicator from "../../components/LoadingIndicator";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/forgot-password/", { email });

      if (response.data.status === "success") {
        localStorage.setItem("email", email);
        navigate("/email-sent");
      } else if (response.data.status === "error") {
        alert(response.data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
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
      className="flex flex-col items-center justify-center bg-white p-5 rounded-[15px] shadow-md lg:max-w-1/4 md:max-w-1/2 max-w-2/3 mx-auto mt-4"
    >
      <p className="form-title">Forgot Password</p>
      <div className="input-name">Email</div>
      <input
        className="form-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPassword;
