import { createContext } from "react";
import { User } from "firebase/auth";

/**
 * Interface for the authentication context properties.
 * This defines the structure of the context, including the user state, authentication functions, and error message.
 *
 * @interface AuthContextProps
 * @property {User | null} user - The current authenticated user or null if not logged in.
 * @property {Function} signup - The function to register a new user with email, password, and full name.
 * @property {Function} googleLogin - The function to log in a user using Google authentication.
 * @property {Function} logout - The function to log out the current authenticated user.
 * @property {string | null} error - The error message if any authentication operation fails.
 */
interface AuthContextProps {
  user: User | null;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

// Create the AuthContext with the specified interface.
// This context will hold the user authentication state and the methods to manage it.
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
