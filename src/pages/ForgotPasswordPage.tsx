import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { useAuth } from "../hooks/UseAuth";
import GradientHeading from "../components/GradientHeading";
import { TextInputField } from "../components/security/TextInputField";
import { SubmitButton } from "../components/SubmitButton";

/**
 * Handles password reset.
 * @param {FormEvent} e - The form submission event.
 * @param {(email: string) => Promise<void>} resetPassword - The reset password function.
 * @param {string} email - The user's email.
 * @param {Dispatch<SetStateAction<boolean>>} setIsLoading - Function to toggle loading state.
 */
async function handlePasswordReset(
  e: FormEvent,
  resetPassword: (email: string) => Promise<void>,
  email: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();
  setIsLoading(true);
  try {
    await resetPassword(email);
  } catch (err) {
    console.error("Password reset failed", err);
  } finally {
    setIsLoading(false);
  }
}

/**
 * Forgot Password Component
 *
 * This component provides a user-friendly password reset form with:
 * - Email input for password recovery.
 * - Submit button for sending reset email.
 * - A modern UI with Tailwind CSS.
 *
 * @returns {JSX.Element} The forgot password form UI.
 */
export default function ForgotPassword() {
  const { resetPassword, error } = useAuth();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-400 to-purple-700">
      {/* Feste Höhe für den weißen Card-Container (anpassbar nach Bedarf) */}
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl max-w-5xl w-full h-[600px]">
        {/* Left section - Form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
          {/* Oberer Bereich: Titel */}
          <div>
            <GradientHeading text="RESET YOUR PASSWORD" />
          </div>

          {/* Mittlerer Bereich: Formular (vertikal zentriert) */}
          <div className="flex flex-col justify-center flex-grow">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <form
              onSubmit={(e) =>
                handlePasswordReset(e, resetPassword, email, setIsLoading)
              }
              className="space-y-6"
            >
              <TextInputField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SubmitButton isLoading={isLoading} text="SEND RESET LINK" />
            </form>
          </div>

          {/* Redirect to Login */}
          <div>
            <p className="mt-4 text-center text-gray-800 select-none">
              Remembered your password?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold transition duration-300 ease-in-out hover:text-purple-700"
              >
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Right section - Illustration */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/forgot-password-image.png"
            alt="Password Reset Illustration"
            className="w-full h-full object-cover rounded-r-xl select-none"
          />
        </div>
      </div>
    </div>
  );
}
