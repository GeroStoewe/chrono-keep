import { useState, useEffect } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
  verifyBeforeUpdateEmail,
  updatePassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * The AuthProvider component manages the authentication state of the user.
 * It provides functionality for login, signup, password reset, profile updates, and account deletion.
 * It also offers a context that makes the user state and authentication methods accessible to any child components.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components that consume the AuthContext.
 *
 * @returns {JSX.Element} The AuthProvider component with context and authentication logic.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * useEffect hook to monitor authentication state.
   * Updates the `user` state whenever the authentication state changes.
   *
   * @returns {Function} A cleanup function to unsubscribe from the auth state when the component unmounts.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setUser(auth.currentUser);
        const token = await currentUser.getIdToken();
        setToken(token);
      } else {
        setUser(null);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * Logs in a user with email and password.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   *
   * @returns {Promise<void>} Resolves when the login is successful, or rejects with an error if it fails.
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
   * Registers a new user with email and password, and updates their profile with full name.
   * After registration, the user is automatically logged in.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {string} firstName - The user's first name.
   * @param {string} lastName - The user's last name.
   *
   * @returns {Promise<void>} Resolves when the registration is successful, or rejects with an error if it fails.
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
   * Enables login using Google Authentication through Firebase.
   * After a successful login, the user is redirected to the dashboard.
   *
   * @returns {Promise<void>} Resolves when Google login is successful, or rejects with an error if it fails.
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
   *
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
   * Verifies the user's current password to allow sensitive actions like updating email or password.
   *
   * @param {string} currentPassword - The user's current password.
   *
   * @returns {Promise<boolean>} Resolves to true if the password is correct, or false if verification fails.
   */
  const verifyPassword = async (currentPassword: string): Promise<boolean> => {
    if (!user) {
      throw new Error("No user is signed in");
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      toast.success("Password verified successfully!");
      return true;
    } catch (error) {
      console.error("Password verification failed", error);
      toast.error("Incorrect password. Please try again.");
      return false;
    }
  };

  /**
   * Updates the user's email address after verifying their current password.
   *
   * @param {User} currentUser - The current signed-in user.
   * @param {string} newEmail - The new email address for the user.
   * @param {string} currentPassword - The user's current password for verification.
   *
   * @returns {Promise<void>} Resolves when the email update is successful, or rejects with an error if it fails.
   */
  const updateEmailFirebase = async (
    currentUser: User,
    newEmail: string,
    currentPassword: string
  ) => {
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email!,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      await verifyBeforeUpdateEmail(currentUser, newEmail);
      toast.info(
        "A verification link has been sent to your email inbox. Please also check your spam folder."
      );
    } catch (error) {
      console.error("Error with updating the email: ", error);
      toast.error(
        "Error with updating the email. Please check your inputs and try again."
      );
    }
  };

  /**
   * Updates the user's profile (full name, email, and password).
   * Reauthentication is required for sensitive updates (email or password).
   *
   * @param {string} firstName - The user's first name.
   * @param {string} lastName - The user's last name.
   * @param {string} newEmail - The new email address for the user.
   * @param {string} currentPassword - The user's current password for verification.
   * @param {string} newPassword - The new password for the user.
   *
   * @returns {Promise<void>} Resolves when the profile is updated successfully, or rejects with an error if it fails.
   */
  const updateUserProfile = async (
    firstName: string,
    lastName: string,
    newEmail: string,
    currentPassword: string,
    newPassword: string
  ) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    try {
      // Reauthenticate if email was changed
      if (
        (newEmail && newEmail !== currentUser.email) ||
        newPassword.trim() !== ""
      ) {
        const isVerified = await verifyPassword(currentPassword);
        if (!isVerified) return;
      }

      // Change Full Name
      if (currentUser.displayName !== fullName) {
        await updateProfile(currentUser, { displayName: fullName });
      }

      // Change Email
      if (newEmail && newEmail !== currentUser.email) {
        await updateEmailFirebase(currentUser, newEmail, currentPassword);
      }

      // Change Password
      if (newPassword.trim() !== "") {
        await updatePassword(currentUser, newPassword);
      }

      await currentUser.reload();
      setUser(auth.currentUser);
      toast.success("Profile updated successfully!");

      if (newEmail && newEmail !== currentUser.email) {
        await signOut(auth);
        toast.warning("Please log in again after verifying your new email.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  /**
   * Signs out the current user.
   *
   * @returns {Promise<void>} Resolves when the user has been signed out successfully, or rejects with an error if it fails.
   */
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success("You have been logged out!");
    } catch (error) {
      toast.error("Something went wrong. Please try again or contact us.");
      console.error("Logout failed", error);
    }
  };

  /**
   * Deletes the user's account after verifying their current password.
   *
   * @param {string} currentPassword - The user's current password for verification.
   *
   * @returns {Promise<void>} Resolves when the account is deleted successfully, or rejects with an error if it fails.
   */
  const deleteAccount = async (currentPassword: string) => {
    if (!user) {
      toast.error("No user is signed in.");
      return;
    }

    try {
      const isVerified = await verifyPassword(currentPassword);
      if (!isVerified) return;

      await deleteUser(user);
      toast.success("Account successfully deleted.");

      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  // Provide the AuthContext so that child components can access authentication data
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          signup,
          googleLogin,
          resetPassword,
          logout,
          updateUserProfile,
          verifyPassword,
          deleteAccount,
          error
        }}
      >
        {children}
      </AuthContext.Provider>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnFocusLoss={false}
        draggable={false}
        className="select-none"
      />
    </>
  );
};
