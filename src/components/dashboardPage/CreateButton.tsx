import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * CreateButton component renders a floating action button that expands
 * when clicked and navigates to a specified route after a short delay.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The text displayed when the button expands.
 * @param {string} props.to - The destination route when the button is clicked.
 * @param {boolean} [props.isLoading=false] - Whether the button shows a loading spinner.
 * @returns {JSX.Element} The rendered CreateButton component.
 */

export function CreateButton({
  text,
  to,
  isLoading = false
}: {
  text: string;
  to: string;
  isLoading?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Collapse the button when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle button click with navigation delay
  const handleClick = () => {
    setIsExpanded(true); // Expand immediately
    setTimeout(() => {
      navigate(to); // Navigate after delay
    }, 500); // Delay navigation by 500ms
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      disabled={isLoading}
      className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 ease-in-out cursor-pointer select-none ${
        isExpanded ? "px-8 py-4" : "w-12 h-12"
      }`}
      onClick={handleClick} // Use the delayed navigation
    >
      {/* Plus Icon */}
      <svg
        className={`w-5 h-5 ${isExpanded ? "mr-2" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>

      {/* Button Text (visible only when expanded) */}
      {isExpanded && <span>{text}</span>}

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
  );
}
