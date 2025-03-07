import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../providers/AuthProvider";
import "../index.css";
import Home from "./Home";
import SignUp from "./security/SignUp";

/**
 * The main application component that sets up routing and provides authentication context to the entire app.
 *
 * This component:
 * - Wraps the entire application in an AuthProvider for managing user authentication state.
 * - Defines routes for different pages (e.g., Home, SignUp).
 *
 * @component
 * @returns {JSX.Element} The app's routing configuration wrapped in the AuthProvider context.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
