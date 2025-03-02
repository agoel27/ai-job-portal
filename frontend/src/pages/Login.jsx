import Form from "../components/Form"
import GoogleLoginButton from "../components/GoogleLoginButton";


function Register() {
    return <div>
        <Form route="/api/token/" method="login" />
        <GoogleLoginButton />
    </div>
}

export default Register