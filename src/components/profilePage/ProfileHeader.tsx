import React from "react";

interface ProfileHeaderProps {
  joinDate: string;
  profileImage: string | null;
  handleRemoveImage: () => void;
  handleAvatarClick: () => void;
  initials: string;
  fullName: string;
  displayEmail: string;
}

/**
 * A component that displays the profile header, including the profile image (or initials), full name,
 * email, and the account creation date. It provides options to change or remove the profile image.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.joinDate - The date the user joined.
 * @param {string | null} props.profileImage - The URL of the user's profile image, or null if no image is set.
 * @param {function} props.handleRemoveImage - A function to handle the removal of the profile image.
 * @param {function} props.handleAvatarClick - A function to handle clicking the avatar (used for uploading a new image).
 * @param {string} props.initials - The initials of the user to display when there is no profile image.
 * @param {string} props.fullName - The full name of the user.
 * @param {string} props.displayEmail - The email address of the user.
 *
 * @returns {JSX.Element} A profile header section containing the user's avatar, full name, email, and join date.
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  joinDate,
  profileImage,
  handleRemoveImage,
  handleAvatarClick,
  initials,
  fullName,
  displayEmail
}) => {
  return (
    <div>
      <span className="absolute top-4 right-6 text-gray-500 text-m select-none">
        Joined: <span className="text-gray-800">{joinDate}</span>
      </span>
      <div className="flex items-center space-x-6">
        <div
          className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer group overflow-hidden"
          onClick={profileImage ? handleRemoveImage : handleAvatarClick}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl font-bold text-white select-none">
              {initials}
            </span>
          )}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-medium select-none">
              {profileImage ? "Remove" : "Change"}
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 select-none">
            {fullName}
          </h2>
          <p className="text-gray-600 select-none">{displayEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
