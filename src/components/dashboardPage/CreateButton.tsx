import { Link } from "react-router-dom";

/**
 * A modern submit button with gradient background, hover effects, and optional icon.
 * @param {Object} props - Component properties
 * @param {string} props.text - The button text
 * @param {string} props.to - The path to navigate to when the button is clicked
 * @param {boolean} [props.isLoading] - Whether the button is in a loading state
 * @param {React.ReactNode} [props.icon] - Optional icon to display before the text
 */
export function CreateButton({
  text,
  to,
  isLoading = false,
  icon,
}: {
  text: string;
  to: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link to={to}>
      <button
        type="submit"
        disabled={isLoading}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer select-none flex items-center justify-center space-x-2"
      >
        {/* Optional Icon */}
        {icon && <span className="text-xl">{icon}</span>}

        {/* Button Text */}
        <span>{text}</span>

        {/* Loading Spinner (if isLoading is true) */}
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5 ml-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </button>
    </Link>
  );
}
