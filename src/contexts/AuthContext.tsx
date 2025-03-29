import { createContext } from "react";
import { User } from "firebase/auth";

/**
 * Interface for the authentication context properties.
 * This defines the structure of the context, including the user state, authentication functions, and error message.
 *
 * @interface AuthContextProps
 * @property {User | null} user - The current authenticated user or null if not logged in.
 * @property {string | null} token - The authentication token used for API requests.
 * @property {Function} login - The function to login a user who already has an account, with email and password.
 * @property {Function} signup - The function to register a new user with email, password, and full name.
 * @property {Function} googleLogin - The function to log in a user using Google authentication.
 * @property {Function} resetPassword - The function to send a password reset email to the user.
 * @property {Function} verifyPassword - The function to verify the user's current password.
 * @property {Function} updateUserProfile - The function to update the user's profile information including email and password.
 * @property {Function} logout - The function to log out the current authenticated user.
 * @property {Function} deleteAccount - The function to delete the user's account with password confirmation.
 * @property {string | null} error - The error message if any authentication operation fails.
 */
interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  googleLogin: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyPassword: (currentPassword: string) => Promise<boolean>;
  updateUserProfile: (
    firstName: string,
    lastName: string,
    email: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: (currentPassword: string) => Promise<void>;
  error: string | null;
}

// Create the AuthContext with the specified interface.
// This context will hold the user authentication state and the methods to manage it.
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
