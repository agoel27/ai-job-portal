import Form from "../components/Form";
import "../styles/Form.css";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Register() {
  return (
    <div className="container">
      <img src="/logo.svg" alt="AI Logo" className="logo" />
      <Form route="/api/token/" method="login" title="Welcome Back!" />
      <GoogleLoginButton />
    </div>
  );
}

export default Register;
