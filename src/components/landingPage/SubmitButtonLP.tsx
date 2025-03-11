import { Link } from "react-router-dom";

/**
 * A submit button for the Landing Page with a gradient background.
 * @param {Object} props - Component properties
 * @param {string} props.text - The button text
 * @param {string} props.to - The path to navigate to when the button is clicked
 */
export function SubmitButtonLP({ text, to }: { text: string; to: string }) {
  return (
    <Link to={to}>
      <button
        type="submit"
        className="px-6 py-3 mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transform hover:scale-105 transition duration-300 cursor-pointer select-none"
      >
        {text}
      </button>
    </Link>
  );
}
