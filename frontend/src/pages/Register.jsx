import Form from "../components/Form";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Register() {
  return (
    <>
      <img src="/logo.svg" alt="AI Logo" className="logo" />
      <Form
        route="/api/user/register/"
        method="register"
        title="Start Today!"
      />
      <GoogleLoginButton />
    </>
  );
}

export default Register;
