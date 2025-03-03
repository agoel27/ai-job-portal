import Form from "../components/Form";
import AILogo from "../../public/AILogo.webp";
import "../styles/Form.css";

function Register() {
  return (
    <div className="container">
      <img src={AILogo} alt="AI Logo" className="logo" />
      <Form route="/api/token/" method="login" />
    </div>
  );
}

export default Register;
