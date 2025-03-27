/**
 * A button component that submits a form and shows a loading state when the `isLoading` prop is true.
 * The button will be disabled and display a loading text while the form is submitting.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {boolean} props.isLoading - A flag indicating if the form is in the loading state. If true, the button will be disabled.
 * @param {string} props.text - The text to display on the button when not loading.
 *
 * @returns {JSX.Element} A submit button with dynamic loading text and styling based on the `isLoading` state.
 */
export function ProfileSubmitButton({
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
      className={`w-40 font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg transform hover:scale-110 transition duration-300 cursor-pointer select-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? <span>Save Changes...</span> : text}
    </button>
  );
}
