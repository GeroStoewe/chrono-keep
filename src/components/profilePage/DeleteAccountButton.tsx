import React from "react";

interface DeleteAccountButtonProps {
  handleDelete: () => void;
}

/**
 * A button component that triggers the deletion of a user account.
 * This button calls the provided `handleDelete` function when clicked.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {function} props.handleDelete - A function that handles the account deletion when the button is clicked.
 *
 * @returns {JSX.Element} A styled button element that, when clicked, calls the `handleDelete` function.
 */
const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = ({
  handleDelete
}) => {
  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white w-40 py-3 rounded-lg shadow-lg font-semibold transition duration-300 hover:shadow-gray-400 select-none cursor-pointer"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
