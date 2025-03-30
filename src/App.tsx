import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../src/providers/AuthProvider";
import "./index.css";
import LandingPage from "../src/pages/LandingPage";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";
import ForgotPasswordPage from "../src/pages/ForgotPasswordPage";
import DashboardPage from "../src/pages/DashboardPage";
import CreateCapsulePage from "./pages/CreateCapsulePage";
import AboutPage from "./pages/AboutPage";
import ArchivePage from "./pages/ArchivePage";
import ProfilePage from "./pages/ProfilePage";
import EditCapsulePage from "./pages/EditCapsulePage";
import { SnackbarProvider } from "notistack";

/**
 * The main application component that sets up routing and provides authentication context to the entire app.
 *
 * This component:
 * - Wraps the entire application in an AuthProvider for managing user authentication state.
 * - Defines routes for different pages (e.g., Dashboard, SignUp).
 *
 * @component
 * @returns {JSX.Element} The app's routing configuration wrapped in the AuthProvider context.
 */
function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}></SnackbarProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-capsule" element={<CreateCapsulePage />} />
            <Route path="/archive" element={<ArchivePage />} />{" "}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<ProfilePage />} />{" "}
            <Route path="/edit-capsule/:id" element={<EditCapsulePage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
