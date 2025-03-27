import React from "react";
import LogoutButton from "./LogoutButton";

interface ProfileGoogleMessageProps {
  logout: () => Promise<void>;
}

/**
 * A component that displays a message indicating that profile editing (email and password changes)
 * is only possible if the user is logged in with email and password. It also includes a logout button.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {function} props.logout - A function that handles the logout process when the button is clicked.
 *
 * @returns {JSX.Element} A message about profile editing restrictions and a logout button.
 */
const ProfileGoogleMessage: React.FC<ProfileGoogleMessageProps> = ({
  logout
}) => {
  return (
    <div>
      <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md">
        <p className="text-yellow-800 select-none">
          Editing profile (name, email & password) is only possible if you log
          in with email and password.
        </p>
      </div>
      <div className="mt-10 flex justify-center">
        <LogoutButton logout={logout} />
      </div>
    </div>
  );
};

export default ProfileGoogleMessage;
