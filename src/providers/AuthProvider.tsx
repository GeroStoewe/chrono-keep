import { useState, useEffect } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * The AuthProvider provides authentication logic for the entire application.
 * This provider manages the user state, sign-up, login, and logout actions.
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
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your credentials and try again.");
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
      navigate("/home");
    } catch (error) {
      console.error("SignUp failed", error);
      setError("Registration failed. Please try again.");
    }
  };

  /**
   * Enables login with Google using the Firebase Google Provider.
   * After a successful login, the user is redirected to the Home Page.
   */
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      console.error("Google login failed", error);
      setError("Google login failed. Please try again.");
    }
  };

  /**
   * Signs out the current user.
   *
   * @returns A promise that resolves when the user has been signed out successfully.
   */
  const logout = async () => {
    await signOut(auth);
  };

  // Provide the AuthContext so that child components can access authentication data
  return (
    <AuthContext.Provider
      value={{ user, login, signup, googleLogin, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
