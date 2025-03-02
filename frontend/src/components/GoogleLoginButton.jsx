import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";  // Correct import
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";  // Import constants
import api from "../api"

const GoogleLoginButton = () => {
    
    const clientId = "271538677494-dh30ken1chq02g80b6ri8jh4jke0q0bt.apps.googleusercontent.com";

    const handleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse;
        const decoded = jwtDecode(credential); // Decodes JWT token

        try {
            const res = await api.post("/auth/google/");

            console.log("Response Status:", res.status);
            console.log("Response Data:", res.data);

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                window.location.href = "/"; // Redirect after login
            }
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    const handleFailure = (error) => {
        console.error("Google login failed:", error);
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
