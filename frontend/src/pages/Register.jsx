import Form from "../components/Form";

function Register() {
  return (
    <>
      <img src="/logo.svg" alt="AI Logo" className="logo" />
      <Form
        route="/api/user/register/"
        method="register"
        title="Start Today!"
      />
    </>
  );
}

export default Register;
