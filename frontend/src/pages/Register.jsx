import Form from "../components/Form"
import GoogleLoginButton from "../components/GoogleLoginButton";


function Register() {
    return <div>
        <Form route="/api/user/register/" method="register" />
        <GoogleLoginButton />
    </div>
}

export default Register