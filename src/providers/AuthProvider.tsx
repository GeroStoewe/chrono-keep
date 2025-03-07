import { useState, useEffect } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * The AuthProvider provides authentication logic for the entire application.
 * This provider manages the user state, sign-up, login, forgot password and logout actions.
 * Any components that need authentication information should be wrapped in this context.
 *
 * @param children - The child components that consume the AuthContext.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * useEffect Hook to monitor the authentication state of the user.
   * Triggered when the component mounts and ensures the user state stays updated.
   *
   * @returns A function to unsubscribe from the auth state when the component unmounts.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  /**
   * Logs in a user with email and password.
   *
   * @param email - The user's email
   * @param password - The user's password
   */
  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  /**
   * Registers a new user with email and password, updates the user's profile
   * with the full name, and navigates to the login page for automatically authentication.
   *
   * @param email - The user's email
   * @param password - The user's password
   * @param firstName - The user's first name
   * @param lastName - The user's last name
   */
  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    setError(null);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const fullName = `${firstName} ${lastName}`;
      await updateProfile(userCredentials.user, { displayName: fullName });
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("SignUp failed", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  /**
   * Enables login with Google using the Firebase Google Provider.
   * After a successful login, the user is redirected to the Home Page.
   */
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  /**
   * Sends a password reset email to the provided email address.
   *
   * This function uses Firebase Authentication to send a password reset email.
   * After the email is successfully sent, the user is redirected to the login page.
   * If an error occurs, an error message is set.
   *
   * @param {string} email - The email address of the user who requested the password reset.
   * @returns {Promise<void>} A promise that resolves once the password reset email is sent, or rejects with an error.
   */
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your inbox.");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Failed to send reset email. Please try again.");
    }
  };

  /**
   * Signs out the current user.
   *
   * @returns A promise that resolves when the user has been signed out successfully.
   */
  const logout = async () => {
    await signOut(auth);
    toast.success("You have been logged out!");
  };

  // Provide the AuthContext so that child components can access authentication data
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          login,
          signup,
          googleLogin,
          resetPassword,
          logout,
          error
        }}
      >
        {children}
      </AuthContext.Provider>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnFocusLoss={false}
        draggable={false}
        className="select-none"
      />
    </>
  );
};
