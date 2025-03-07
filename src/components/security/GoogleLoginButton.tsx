/**
 * A button for signing in with Google.
 * @param {Object} props - Component properties
 * @param {function} props.onClick - Handler for button click
 */
export function GoogleLoginButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full mt-2 bg-white border-2 border-gray-300 text-gray-800 py-3 rounded-lg transform hover:scale-105 transition duration-300 flex items-center justify-center cursor-pointer select-none"
    >
      <img src="/google-logo.svg" alt="Google" className="w-6 h-6 mr-2" />
      Continue with Google
    </button>
  );
}
