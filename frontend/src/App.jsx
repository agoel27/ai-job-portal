import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/FormPages/Login";
import Register from "./pages/FormPages/Register";
import EmailSent from "./pages/FormPages/EmailSent";
import EmailVerify from "./pages/FormPages/EmailVerify";
import ForgotPassword from "./pages/FormPages/ForgotPassword";
import ResetPassword from "./pages/FormPages/ResetPassword";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ApplicantCenter from "./pages/ApplicantCenter";
import ApplicantJobDetails from "./pages/ApplicantJobDetails";
import ApplicantJobPortal from "./pages/ApplicantJobPortal";
import NewJobDetails from "./pages/NewJobDetails";
import NewJobApplicantInfo from "./pages/NewJobApplicantInfo";
import NewJobFinalDetails from "./pages/NewJobFinalDetails";
import NewJobPreview from "./pages/NewJobPreview";
import RecruiterCenter from "./pages/RecruiterCenter";
import SubmitResume from "./pages/SubmitResume";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/email-sent" element={<EmailSent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:uid/:token" element={<EmailVerify />} />

        <Route path="/applicant-center" element={<ApplicantCenter />} />
        <Route
          path="/applicant-job-details"
          element={<ApplicantJobDetails />}
        />
        <Route path="/applicant-job-portal" element={<ApplicantJobPortal />} />
        <Route path="/new-job-details" element={<NewJobDetails />} />
        <Route
          path="/new-job-applicant-info"
          element={<NewJobApplicantInfo />}
        />
        <Route path="/new-job-final-details" element={<NewJobFinalDetails />} />
        <Route path="/new-job-preview" element={<NewJobPreview />} />
        <Route path="/recruiter-center" element={<RecruiterCenter />} />
        <Route path="/submit-resume" element={<SubmitResume />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
