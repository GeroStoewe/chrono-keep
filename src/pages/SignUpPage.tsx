import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { useAuth } from "../hooks/UseAuth";
import { getAuth } from "firebase/auth";
import GradientHeading from "../components/GradientHeading";
import { TextInputField } from "../components/security/TextInputField";
import { PasswordInput } from "../components/security/PasswordInputField";
import { SubmitButton } from "../components/SubmitButton";
import { Divider } from "../components/Divider";
import { GoogleLoginButton } from "../components/security/GoogleLoginButton";

/**
 * Handles user signup.
 * @param {FormEvent} e - The form submission event.
 * @param {(email: string, password: string, firstName: string, lastName: string) => Promise<void>} signup - The signup function from useAuth.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {Dispatch<SetStateAction<boolean>>} setIsLoading - Function to toggle loading state.
 */
async function handleSignUp(
  e: FormEvent,
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();
  setIsLoading(true);
  try {
    await signup(email, password, firstName, lastName);

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();

      const response = await fetch("http://localhost:5000/api/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Backend error: " + response.statusText);
      }

      const data = await response.json();
      console.log("Backend Response:", data);
    }
  } catch (err) {
    console.error("SignUp failed", err);
  } finally {
    setIsLoading(false);
  }
}

/**
 * SignUp Component
 *
 * This component provides a user-friendly registration form with:
 * - Traditional email/password signup.
 * - Google authentication.
 * - Password visibility toggle.
 * - A modern UI with Tailwind CSS.
 *
 * @returns {JSX.Element} The signup form UI.
 */
export default function SignUp() {
  const { signup, googleLogin, error } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-400 to-purple-700">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl max-w-4xl w-full">
        {/* Left section - SignUp Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/signup-image.png"
            alt="SignUp Illustration"
            className="w-full h-full object-cover rounded-l-xl select-none"
          />
        </div>

        {/* Right section - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <GradientHeading text="CREATE YOUR ACCOUNT" />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Sign Up Form */}
          <form
            onSubmit={(e) =>
              handleSignUp(
                e,
                signup,
                email,
                password,
                firstName,
                lastName,
                setIsLoading
              )
            }
            className="space-y-6"
          >
            <div className="flex space-x-4">
              {/* First Name Input */}
              <div className="flex-1">
                <TextInputField
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name Input */}
              <div className="flex-1">
                <TextInputField
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

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

            {/* Submit Button */}
            <SubmitButton isLoading={isLoading} text="SIGN UP" />
          </form>

          {/* Or Divider */}
          <Divider />

          {/* Google Login Button */}
          <GoogleLoginButton onClick={googleLogin} />

          {/* Redirect to Login */}
          <p className="mt-4 text-center text-gray-800 select-none">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold transition duration-300 ease-in-out hover:text-purple-700"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
