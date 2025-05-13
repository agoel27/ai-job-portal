<<<<<<< HEAD:frontend/src/pages/Register.jsx
import { Link } from "react-router-dom";
import Form from "../components/Form";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { JobDetailsForm } from "../components/JobDetailsPage";

function Register() {
  return (
    <>
      
      <img src="/logo.svg" alt="AI Logo" className="logo" />
      <Form route="/api/user/register/" method="register" title="Start Today!" />

      {/* Move Terms, Privacy, and Cookies Policy text higher (above GoogleLoginButton) */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          By clicking Sign Up you agree to 1.800HIRED's{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms
          </Link>
          ,{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy
          </Link>
          , and{" "}
          <Link to="/cookies-policy" className="text-blue-600 hover:underline">
            Cookies Policy
          </Link>
          .
        </p>
      </div>

      <GoogleLoginButton />
    </>
=======
import Form from "../../components/Form";

function Register() {
  return (
    <div>
      <img src="/logo.svg" alt="AI Logo" className="logo" />
      <Form
        route="/api/user/register/"
        method="register"
        title="Start Today!"
      />
    </div>
>>>>>>> ae1e9776b0c15db6506a65012daa2d04dc0cf923:frontend/src/pages/FormPages/Register.jsx
  );
}

export default Register;
