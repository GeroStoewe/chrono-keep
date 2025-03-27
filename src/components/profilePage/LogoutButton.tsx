import React from "react";

interface LogoutButtonProps {
  logout: () => Promise<void>;
}

/**
 * A button component that triggers the logout action when clicked.
 * This button calls the provided `logout` function to log out the user.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {function} props.logout - A function that handles logging out the user when the button is clicked.
 *
 * @returns {JSX.Element} A styled button element that, when clicked, calls the `logout` function.
 */
const LogoutButton: React.FC<LogoutButtonProps> = ({ logout }) => {
  return (
    <button
      onClick={logout}
      className="bg-white w-40 text-red-600 font-semibold px-6 py-3 rounded-lg shadow-lg border border-gray-300 transition duration-300 hover:shadow-gray-400 select-none cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
