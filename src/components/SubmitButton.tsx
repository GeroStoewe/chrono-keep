/**
 * A submit button with a loading indicator.
 * @param {Object} props - Component properties
 * @param {boolean} props.isLoading - Indicates whether the button is loading
 * @param {string} props.text - The button text
 */
export function SubmitButton({
  isLoading,
  text
}: {
  isLoading: boolean;
  text: string;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg transform hover:scale-105 transition duration-300 cursor-pointer select-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? <span>Loading...</span> : text}
    </button>
  );
}
