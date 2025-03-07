import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { useAuth } from "../hooks/UseAuth";
import GradientHeading from "../components/GradientHeading";
import { TextInputField } from "../components/security/TextInputField";
import { PasswordInput } from "../components/security/PasswordInputField";
import { SubmitButton } from "../components/SubmitButton";
import { Divider } from "../components/Divider";
import { GoogleLoginButton } from "../components/security/GoogleLoginButton";

/**
 * Handles user login.
 * @param {FormEvent} e - The form submission event.
 * @param {(email: string, password: string) => Promise<void>} login - The login function from useAuth.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {Dispatch<SetStateAction<boolean>>} setIsLoading - Function to toggle loading state.
 */
async function handleLogin(
  e: FormEvent,
  login: (email: string, password: string) => Promise<void>,
  email: string,
  password: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();
  setIsLoading(true);
  try {
    await login(email, password);
  } catch (err) {
    console.error("Login failed", err);
  } finally {
    setIsLoading(false);
  }
}

/**
 * Login Component
 *
 * This component provides a user-friendly login form with:
 * - Traditional email/password login.
 * - Google authentication.
 * - Password visibility toggle.
 * - A modern UI with Tailwind CSS.
 *
 * @returns {JSX.Element} The login form UI.
 */
export default function Login() {
  const { login, googleLogin, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-400 to-purple-700">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl max-w-5xl w-full">
        {/* Left section - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <GradientHeading text="WELCOME TO CHRONO KEEP" />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Login Form */}
          <form
            onSubmit={(e) =>
              handleLogin(e, login, email, password, setIsLoading)
            }
          >
            <div className="space-y-6">
              {/* Email Input */}
              <TextInputField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Input */}
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Forgot Password Link */}
            <p className="text-right text-gray-800 select-none mt-1">
              Forgot your password?{" "}
              <a
                href="/forgot-password"
                className="text-blue-600 font-semibold transition duration-300 ease-in-out hover:text-purple-700"
              >
                Reset it here
              </a>
            </p>

            {/* Submit Button */}
            <div className="mt-6">
              <SubmitButton isLoading={isLoading} text="LOGIN" />
            </div>
          </form>

          {/* Or Divider */}
          <Divider />

          {/* Google Login Button */}
          <GoogleLoginButton onClick={googleLogin} />

          {/* Redirect to Sign Up */}
          <p className="mt-4 text-center text-gray-800 select-none">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-semibold transition duration-300 ease-in-out hover:text-purple-700"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Right section - Login Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/login-image.png"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-r-xl select-none"
          />
        </div>
      </div>
    </div>
  );
}
