import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { useAuth } from "../../hooks/UseAuth";
import { usePasswordToggle } from "../../hooks/UsePasswordToggle";

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
  const [showPassword, togglePassword, passwordRef] = usePasswordToggle();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-400 to-purple-700">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl max-w-4xl w-full">
        {/* Left section - SignUp Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/signup-image.png"
            alt="SignUp Illustration"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right section - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2
            className="text-4xl font-extrabold text-center text-gradient mb-6 tracking-wide select-none bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "45px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
            }}
          >
            create your account
          </h2>

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
                <label className="block text-gray-800 font-semibold mb-0.5 select-none">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-transparent transition duration-300 transform hover:scale-105 focus:gradient-border"
                />
              </div>

              {/* Last Name Input */}
              <div className="flex-1">
                <label className="block text-gray-800 font-semibold mb-0.5 select-none">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-transparent transition duration-300 transform hover:scale-105 focus:gradient-border"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-800 font-semibold mb-0.5 select-none">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-transparent transition duration-300 transform hover:scale-105 focus:gradient-border"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-800 font-semibold mb-0.5 select-none">
                Password
              </label>
              <div className="relative group">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  maxLength={35}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition duration-300 transform group-hover:scale-105 focus:gradient-border"
                />
                {/* Password Visibility Toggle */}
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-full"
                >
                  <img
                    src={
                      showPassword
                        ? "/icons/visibility.svg"
                        : "/icons/visibility-off.svg"
                    }
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="w-5 h-5 text-transparent bg-clip-text"
                  />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg transform hover:scale-105 transition duration-300 cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? <span>Loading...</span> : "CREATE ACCOUNT"}
            </button>
          </form>

          {/* Or Continue With Text */}
          <div className="mt-4 flex justify-center items-center">
            <hr className="flex-grow border-t-2 border-gray-300" />
            <span className="mx-4 text-gray-800 font-semibold select-none">
              or continue with
            </span>
            <hr className="flex-grow border-t-2 border-gray-300" />
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={googleLogin}
            className="w-full mt-2 bg-white border-2 border-gray-300 text-gray-800 py-3 rounded-lg transform hover:scale-105 transition duration-300 flex items-center justify-center cursor-pointer"
          >
            <img src="/google-logo.svg" alt="Google" className="w-6 h-6 mr-2" />
            Continue with Google
          </button>

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
