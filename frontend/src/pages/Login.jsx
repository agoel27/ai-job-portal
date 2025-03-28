import Form from "../components/Form";
import "../styles/Form.css";

function Register() {
  return (
    <div className="">
      <img src="/logo.svg" alt="AI Logo" className="logo" />
      <Form route="/api/token/" method="login" title="Welcome Back!" />
    </div>
  );
}

export default Register;
