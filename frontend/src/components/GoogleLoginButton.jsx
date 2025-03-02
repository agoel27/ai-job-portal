import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";  // Correct import
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";  // Import constants
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Install via npm if needed
import api from "../api"

const GoogleLoginButton = () => {

    const navigate = useNavigate();
    
    const clientId = "271538677494-dh30ken1chq02g80b6ri8jh4jke0q0bt.apps.googleusercontent.com";
    // const navigate = useNavigate();

    // import axios from "axios";
    // import Cookies from "js-cookie"; // Install via npm if needed: `npm install js-cookie`
    
    const handleSuccess = async (response) => {
        try {
            const csrfToken = Cookies.get("csrftoken"); // Retrieve CSRF token
    
            const res = await axios.post(
                "http://127.0.0.1:8000/auth/google/",  // Update with your actual backend URL
                {
                    credential: response.credential,  // Ensure the correct key is used
                },
                {
                    headers: {
                        "X-CSRFToken": csrfToken,  // Include CSRF token for security
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Ensure cookies (including CSRF) are sent
                }
            );
    
            console.log("Login successful!", res.data);
    
            // Store access & refresh tokens in localStorage or cookies (choose one)
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            navigate("/");
    
            // Redirect or update UI on successful login
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };
    
    // export default handleSuccess;
    

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
