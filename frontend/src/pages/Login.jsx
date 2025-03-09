import Form from "../components/Form";
import AILogo from "../../public/AILogo.webp";
import "../styles/Form.css";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Register() {
  return (
    <div className="container">
      <img src={AILogo} alt="AI Logo" className="logo" />
      <Form route="/api/token/" method="login" />
      <GoogleLoginButton />
    </div>
  );
}

export default Register;
