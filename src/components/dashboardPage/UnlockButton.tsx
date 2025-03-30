import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * UnlockButton component renders a button that expands on click, triggers an action,
 * and navigates to a specified route after a delay.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The text displayed when the button expands.
 * @param {Function} props.onClick - The function to execute when the button is clicked.
 * @param {boolean} [props.isLoading=false] - Whether the button shows a loading spinner.
 * @param {string} props.to - The destination route when the button is clicked.
 * @returns {JSX.Element} The rendered UnlockButton component.
 */

export function UnlockButton({
  text,
  onClick,
  isLoading = false,
  to,
}: {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
  to: string;
}) {
 
  // Handle button click
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

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
    onClick();
    setTimeout(() => {
      navigate(to); // Navigate after delay
    }, 500); // Delay navigation by 500ms
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      disabled={isLoading}
      className="relative flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 ease-in-out cursor-pointer select-none w-12 h-12 hover:px-8 hover:py-4"
      onClick={handleClick}
    >
      {/* Unlock Icon */}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
        ></path>
      </svg>

      {/* Button Text (visible only when hovered) */}
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
